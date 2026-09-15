"use client";

import { useState, useEffect, useTransition } from "react";
import { 
  getProjectCategories, createCategory, updateCategory, deleteCategory,
  getProjects, createProject, updateProject, deleteProject 
} from "@/lib/actions/projects";
import type { ProjectCategory, Project } from "@/lib/types";
import DeleteConfirm from "@/components/admin/DeleteConfirm";
import { Edit2, Plus, Trash2, Folder, Code, Box, Gamepad, Sparkles } from "lucide-react";

const ICONS = {
  code: <Code size={18} />,
  cube: <Box size={18} />,
  gamepad: <Gamepad size={18} />,
  sparkles: <Sparkles size={18} />,
};

export default function ProjectsPage() {
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  
  // Category Form State
  const [isCatFormOpen, setIsCatFormOpen] = useState(false);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [catForm, setCatForm] = useState({ id: "", title: "", description: "", icon: "code" });

  // Project Form State
  const [isProjFormOpen, setIsProjFormOpen] = useState(false);
  const [editingProjId, setEditingProjId] = useState<string | null>(null);
  const [projForm, setProjForm] = useState({
    title: "", description: "", tech_stack: "", key_features: "", repo_link: "", live_link: "", category_id: ""
  });

  const loadData = async () => {
    try {
      const [catsRes, projsRes] = await Promise.all([getProjectCategories(), getProjects()]);
      const cats = catsRes.success ? (catsRes.data || []) : [];
      const projs = projsRes.success ? (projsRes.data || []) : [];
      setCategories(cats);
      setProjects(projs);
      if (cats && cats.length > 0 && !activeCategory) {
        setActiveCategory(cats[0].id);
      }
    } catch (error) {
      console.error("Failed to load projects data", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --- Category Handlers ---
  const handleOpenCatForm = (cat?: ProjectCategory) => {
    if (cat) {
      setEditingCatId(cat.id);
      setCatForm({ id: cat.id, title: cat.title, description: cat.description || "", icon: cat.icon || "code" });
    } else {
      setEditingCatId(null);
      setCatForm({ id: "", title: "", description: "", icon: "code" });
    }
    setIsCatFormOpen(true);
  };

  const handleCatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const formData = new FormData();
        Object.entries(catForm).forEach(([key, value]) => formData.append(key, value));
        
        if (editingCatId) {
          await updateCategory(editingCatId, formData);
        } else {
          await createCategory(formData);
          setActiveCategory(catForm.id); // set active to newly created
        }
        setIsCatFormOpen(false);
        loadData();
      } catch (error) {
        console.error("Failed to save category", error);
      }
    });
  };

  const handleCatDelete = async (id: string) => {
    startTransition(async () => {
      try {
        await deleteCategory(id);
        if (activeCategory === id) setActiveCategory(null);
        loadData();
      } catch (error) {
        console.error("Failed to delete category", error);
      }
    });
  };

  // --- Project Handlers ---
  const handleOpenProjForm = (proj?: Project) => {
    if (proj) {
      setEditingProjId(proj.id);
      setProjForm({
        title: proj.title,
        description: proj.description || "",
        tech_stack: Array.isArray(proj.tech_stack) ? proj.tech_stack.join(", ") : "",
        key_features: Array.isArray(proj.key_features) ? proj.key_features.join(", ") : "",
        repo_link: proj.repo_link || "",
        live_link: proj.live_link || "",
        category_id: proj.category_id,
      });
    } else {
      setEditingProjId(null);
      setProjForm({
        title: "", description: "", tech_stack: "", key_features: "", repo_link: "", live_link: "", category_id: activeCategory || (categories[0]?.id || "")
      });
    }
    setIsProjFormOpen(true);
  };

  const handleProjSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", projForm.title);
        formData.append("description", projForm.description);
        formData.append("repo_link", projForm.repo_link);
        formData.append("live_link", projForm.live_link);
        formData.append("category_id", projForm.category_id);
        
        // Convert comma separated to array strings
        const techStack = projForm.tech_stack.split(",").map(i => i.trim()).filter(Boolean);
        const keyFeatures = projForm.key_features.split(",").map(i => i.trim()).filter(Boolean);
        
        formData.append("tech_stack", JSON.stringify(techStack));
        formData.append("key_features", JSON.stringify(keyFeatures));

        if (editingProjId) {
          await updateProject(editingProjId, formData);
        } else {
          await createProject(formData);
        }
        setIsProjFormOpen(false);
        loadData();
      } catch (error) {
        console.error("Failed to save project", error);
      }
    });
  };

  const handleProjDelete = async (id: string) => {
    startTransition(async () => {
      try {
        await deleteProject(id);
        loadData();
      } catch (error) {
        console.error("Failed to delete project", error);
      }
    });
  };

  const activeProjects = projects.filter(p => p.category_id === activeCategory);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-pt-serif text-3xl font-bold mb-8">Projects</h1>
      </div>

      {/* CATEGORIES SECTION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-pt-serif text-2xl flex items-center gap-2">
            <Folder size={24} /> Categories
          </h2>
          <button
            onClick={() => handleOpenCatForm()}
            className="bg-black text-white rounded-full font-jersey uppercase tracking-widest text-xs px-6 py-2 flex items-center gap-2"
          >
            <Plus size={16} /> Add Category
          </button>
        </div>

        {isCatFormOpen && (
          <div className="bg-[#f5f5f5] border border-black/10 rounded-xl p-6">
            <h3 className="font-pt-serif text-xl mb-4">{editingCatId ? "Edit" : "Add"} Category</h3>
            <form onSubmit={handleCatSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">ID (slug)</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingCatId}
                    value={catForm.id}
                    onChange={(e) => setCatForm({ ...catForm, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none disabled:opacity-50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Title</label>
                  <input
                    type="text"
                    required
                    value={catForm.title}
                    onChange={(e) => setCatForm({ ...catForm, title: e.target.value })}
                    className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Icon</label>
                  <select
                    value={catForm.icon}
                    onChange={(e) => setCatForm({ ...catForm, icon: e.target.value })}
                    className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none h-[42px]"
                  >
                    <option value="code">Code</option>
                    <option value="cube">Cube</option>
                    <option value="gamepad">Gamepad</option>
                    <option value="sparkles">Sparkles</option>
                  </select>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Description</label>
                  <textarea
                    rows={2}
                    value={catForm.description}
                    onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                    className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" disabled={isPending} className="bg-black text-white rounded-full font-jersey uppercase tracking-widest text-xs px-6 py-2 disabled:opacity-50">
                  {isPending ? "Saving..." : "Save"}
                </button>
                <button type="button" onClick={() => setIsCatFormOpen(false)} className="border border-black/10 rounded-full font-jersey uppercase tracking-widest text-xs px-6 py-2 hover:bg-black/5">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          {categories.map(cat => (
            <div 
              key={cat.id} 
              className={`p-4 rounded-xl border flex flex-col min-w-[200px] transition-colors cursor-pointer ${
                activeCategory === cat.id ? 'bg-black text-white border-black' : 'bg-[#f5f5f5] text-black border-black/10 hover:border-black/30'
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${activeCategory === cat.id ? 'bg-white/20' : 'bg-white'}`}>
                  {ICONS[cat.icon as keyof typeof ICONS] || <Code size={18} />}
                </div>
                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => handleOpenCatForm(cat)} className={`p-1 rounded ${activeCategory === cat.id ? 'hover:bg-white/20' : 'hover:bg-black/10'}`}><Edit2 size={14} /></button>
                  <DeleteConfirm onConfirm={() => handleCatDelete(cat.id)}>
                    <button className={`p-1 rounded ${activeCategory === cat.id ? 'hover:bg-red-500/50' : 'hover:bg-red-100 text-red-600'}`}><Trash2 size={14} /></button>
                  </DeleteConfirm>
                </div>
              </div>
              <h3 className="font-pt-serif text-lg font-bold">{cat.title}</h3>
              <p className={`font-caveat text-sm ${activeCategory === cat.id ? 'text-white/70' : 'text-gray-500'} line-clamp-1`}>{cat.description}</p>
            </div>
          ))}
          {categories.length === 0 && <p className="text-gray-400 font-caveat text-xl">No categories found.</p>}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      {activeCategory && (
        <section className="space-y-6 pt-8 border-t border-black/10">
          <div className="flex items-center justify-between">
            <h2 className="font-pt-serif text-2xl flex items-center gap-2">
              <Code size={24} /> Projects in {categories.find(c => c.id === activeCategory)?.title}
            </h2>
            <button
              onClick={() => handleOpenProjForm()}
              className="bg-black text-white rounded-full font-jersey uppercase tracking-widest text-xs px-6 py-2 flex items-center gap-2"
            >
              <Plus size={16} /> Add Project
            </button>
          </div>

          {isProjFormOpen && (
            <div className="bg-[#f5f5f5] border border-black/10 rounded-xl p-6">
              <h3 className="font-pt-serif text-xl mb-4">{editingProjId ? "Edit" : "Add"} Project</h3>
              <form onSubmit={handleProjSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Title</label>
                    <input
                      type="text"
                      required
                      value={projForm.title}
                      onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Category</label>
                    <select
                      value={projForm.category_id}
                      onChange={(e) => setProjForm({ ...projForm, category_id: e.target.value })}
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none h-[42px]"
                    >
                      {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Description</label>
                    <textarea
                      required
                      rows={2}
                      value={projForm.description}
                      onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={projForm.tech_stack}
                      onChange={(e) => setProjForm({ ...projForm, tech_stack: e.target.value })}
                      placeholder="React, Tailwind, Node.js"
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Key Features (comma separated)</label>
                    <input
                      type="text"
                      value={projForm.key_features}
                      onChange={(e) => setProjForm({ ...projForm, key_features: e.target.value })}
                      placeholder="Auth, Payments, Dashboard"
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Repo Link</label>
                    <input
                      type="url"
                      value={projForm.repo_link}
                      onChange={(e) => setProjForm({ ...projForm, repo_link: e.target.value })}
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Live Link</label>
                    <input
                      type="url"
                      value={projForm.live_link}
                      onChange={(e) => setProjForm({ ...projForm, live_link: e.target.value })}
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="submit" disabled={isPending} className="bg-black text-white rounded-full font-jersey uppercase tracking-widest text-xs px-6 py-2 disabled:opacity-50">
                    {isPending ? "Saving..." : "Save"}
                  </button>
                  <button type="button" onClick={() => setIsProjFormOpen(false)} className="border border-black/10 rounded-full font-jersey uppercase tracking-widest text-xs px-6 py-2 hover:bg-black/5">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeProjects.map((proj) => (
              <div key={proj.id} className="bg-[#f5f5f5] border border-black/10 rounded-xl p-6 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-pt-serif text-xl font-bold">{proj.title}</h3>
                  <div className="flex gap-1">
                    <button onClick={() => handleOpenProjForm(proj)} className="p-1.5 hover:bg-black/5 rounded-lg"><Edit2 size={16} /></button>
                    <DeleteConfirm onConfirm={() => handleProjDelete(proj.id)}>
                      <button className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg"><Trash2 size={16} /></button>
                    </DeleteConfirm>
                  </div>
                </div>
                
                <p className="font-caveat text-lg text-gray-600 mb-4 line-clamp-3 flex-grow">{proj.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {Array.isArray(proj.tech_stack) && proj.tech_stack.map((tech, idx) => (
                    <span key={idx} className="bg-white border border-black/10 px-2 py-1 rounded-md font-jersey text-[10px] uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-black/5">
                  {proj.repo_link && <a href={proj.repo_link} target="_blank" rel="noreferrer" className="text-xs font-jersey uppercase hover:underline">Repo</a>}
                  {proj.live_link && <a href={proj.live_link} target="_blank" rel="noreferrer" className="text-xs font-jersey uppercase hover:underline">Live Demo</a>}
                </div>
              </div>
            ))}
            {activeProjects.length === 0 && <div className="col-span-full text-center py-12 text-gray-400 font-caveat text-xl">No projects in this category.</div>}
          </div>
        </section>
      )}
    </div>
  );
}

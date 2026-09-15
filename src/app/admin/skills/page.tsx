"use client";

import { useState, useEffect, useTransition } from "react";
import { getSkills, createSkill, updateSkill, deleteSkill } from "@/lib/actions/skills";
import type { Skill } from "@/lib/types";
import FileUploader from "@/components/admin/FileUploader";
import DeleteConfirm from "@/components/admin/DeleteConfirm";
import { Edit2, Plus, Trash2 } from "lucide-react";

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    icon_url: "",
  });

  const loadSkills = async () => {
    try {
      const res = await getSkills();
      if (res.success) setSkills(res.data || []);
    } catch (error) {
      console.error("Failed to load skills", error);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleOpenForm = (skill?: Skill) => {
    if (skill) {
      setEditingId(skill.id);
      setFormData({
        name: skill.name || "",
        icon_url: skill.icon_url || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        icon_url: "",
      });
    }
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataObj.append(key, value);
        });

        if (editingId) {
          await updateSkill(editingId, formDataObj);
        } else {
          await createSkill(formDataObj);
        }
        setIsFormOpen(false);
        loadSkills();
      } catch (error) {
        console.error("Failed to save skill", error);
      }
    });
  };

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      try {
        await deleteSkill(id);
        loadSkills();
      } catch (error) {
        console.error("Failed to delete skill", error);
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-pt-serif text-3xl font-bold">Skills</h1>
        <button
          onClick={() => handleOpenForm()}
          className="bg-black text-white rounded-full font-jersey uppercase tracking-widest text-xs px-6 py-2 flex items-center gap-2"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-[#f5f5f5] border border-black/10 rounded-xl p-6 mb-8">
          <h2 className="font-pt-serif text-2xl mb-4">{editingId ? "Edit" : "Add"} Skill</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Skill Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                placeholder="e.g. React"
              />
            </div>
            
            <div className="space-y-1">
              <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Icon URL</label>
              <p className="text-xs text-gray-500 mb-2 font-sans">
                Use devicon URLs like: https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg
              </p>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={formData.icon_url}
                  onChange={(e) => setFormData({ ...formData, icon_url: e.target.value })}
                  className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                  placeholder="Paste URL or upload below..."
                />
                <div className="border-t border-black/10 pt-4">
                  <FileUploader
                    value={formData.icon_url}
                    onChange={(url) => setFormData({ ...formData, icon_url: url })}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="bg-black text-white rounded-full font-jersey uppercase tracking-widest text-xs px-6 py-2 disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="border border-black/10 rounded-full font-jersey uppercase tracking-widest text-xs px-6 py-2 hover:bg-black/5"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-[#f5f5f5] border border-black/10 rounded-xl p-4 flex flex-col items-center gap-3 relative group">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-white/90 p-1 rounded-lg shadow-sm border border-black/10">
              <button
                onClick={() => handleOpenForm(skill)}
                className="p-1 hover:bg-black/5 rounded transition-colors"
                title="Edit"
              >
                <Edit2 size={14} />
              </button>
              <DeleteConfirm onConfirm={() => handleDelete(skill.id)}>
                <button
                  className="p-1 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </DeleteConfirm>
            </div>
            
            <div className="w-12 h-12 flex items-center justify-center">
              {skill.icon_url ? (
                <img src={skill.icon_url} alt={skill.name} className="max-w-full max-h-full object-contain" />
              ) : (
                <div className="w-full h-full bg-black/5 rounded-full" />
              )}
            </div>
            <span className="font-jersey tracking-wider uppercase text-sm text-center">
              {skill.name}
            </span>
          </div>
        ))}
        {skills.length === 0 && !isFormOpen && (
          <div className="col-span-full text-center py-12 text-gray-400 font-caveat text-xl">
            No skills found. Add one!
          </div>
        )}
      </div>
    </div>
  );
}

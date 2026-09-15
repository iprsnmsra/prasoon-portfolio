"use client";

import { useState, useEffect, useTransition } from "react";
import { getExperiences, createExperience, updateExperience, deleteExperience } from "@/lib/actions/experiences";
import type { Experience } from "@/lib/types";
import FileUploader from "@/components/admin/FileUploader";
import DeleteConfirm from "@/components/admin/DeleteConfirm";
import { Edit2, Plus, Trash2 } from "lucide-react";

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    join_date: "",
    description: "",
    logo_url: "",
    image_url: "",
  });

  const loadExperiences = async () => {
    try {
      const res = await getExperiences();
      if (res.success) setExperiences(res.data || []);
    } catch (error) {
      console.error("Failed to load experiences", error);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleOpenForm = (exp?: Experience) => {
    if (exp) {
      setEditingId(exp.id);
      setFormData({
        company: exp.company || "",
        role: exp.role || "",
        join_date: exp.join_date || "",
        description: exp.description || "",
        logo_url: exp.logo_url || "",
        image_url: exp.image_url || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        company: "",
        role: "",
        join_date: "",
        description: "",
        logo_url: "",
        image_url: "",
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
          await updateExperience(editingId, formDataObj);
        } else {
          await createExperience(formDataObj);
        }
        setIsFormOpen(false);
        loadExperiences();
      } catch (error) {
        console.error("Failed to save experience", error);
      }
    });
  };

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      try {
        await deleteExperience(id);
        loadExperiences();
      } catch (error) {
        console.error("Failed to delete experience", error);
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-pt-serif text-3xl font-bold">Experiences</h1>
        <button
          onClick={() => handleOpenForm()}
          className="bg-black text-white rounded-full font-jersey uppercase tracking-widest text-xs px-6 py-2 flex items-center gap-2"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-[#f5f5f5] border border-black/10 rounded-xl p-6 mb-8">
          <h2 className="font-pt-serif text-2xl mb-4">{editingId ? "Edit" : "Add"} Experience</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Company</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Role</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Join Date</label>
                <input
                  type="text"
                  required
                  value={formData.join_date}
                  onChange={(e) => setFormData({ ...formData, join_date: e.target.value })}
                  className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                  placeholder="e.g. Oct 2023 - Present"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Description</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Logo</label>
                <FileUploader
                  value={formData.logo_url}
                  onChange={(url) => setFormData({ ...formData, logo_url: url })}
                  accept="image/*"
                />
              </div>
              <div className="space-y-1">
                <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Welcome Kit / Image</label>
                <FileUploader
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  accept="image/*"
                />
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

      <div className="grid grid-cols-1 gap-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-[#f5f5f5] border border-black/10 rounded-xl p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white border border-black/10 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                {exp.logo_url ? (
                  <img src={exp.logo_url} alt={exp.company} className="w-full h-full object-contain p-2" />
                ) : (
                  <span className="font-jersey text-xs text-gray-400">LOGO</span>
                )}
              </div>
              <div>
                <h3 className="font-pt-serif text-xl font-bold">{exp.role}</h3>
                <p className="font-caveat text-lg">{exp.company} &bull; {exp.join_date}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenForm(exp)}
                className="p-2 border border-black/10 rounded-xl hover:bg-white transition-colors"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
              <DeleteConfirm onConfirm={() => handleDelete(exp.id)}>
                <button
                  className="p-2 border border-black/10 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </DeleteConfirm>
            </div>
          </div>
        ))}
        {experiences.length === 0 && !isFormOpen && (
          <div className="text-center py-12 text-gray-400 font-caveat text-xl">
            No experiences found. Add one!
          </div>
        )}
      </div>
    </div>
  );
}

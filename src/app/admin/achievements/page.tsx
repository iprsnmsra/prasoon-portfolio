"use client";

import { useState, useEffect, useTransition } from "react";
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from "@/lib/actions/achievements";
import type { Achievement } from "@/lib/types";
import FileUploader from "@/components/admin/FileUploader";
import DeleteConfirm from "@/components/admin/DeleteConfirm";
import { Edit2, Plus, Trash2, Trophy, Award } from "lucide-react";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    type: "hackathon",
    title: "",
    description: "",
    perks: "",
    image_url: "",
  });

  const loadAchievements = async () => {
    try {
      const res = await getAchievements();
      if (res.success) setAchievements(res.data || []);
    } catch (error) {
      console.error("Failed to load achievements", error);
    }
  };

  useEffect(() => {
    loadAchievements();
  }, []);

  const handleOpenForm = (achievement?: Achievement) => {
    if (achievement) {
      setEditingId(achievement.id);
      setFormData({
        type: achievement.type || "hackathon",
        title: achievement.title || "",
        description: achievement.description || "",
        perks: achievement.perks || "",
        image_url: achievement.image_url || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        type: "hackathon",
        title: "",
        description: "",
        perks: "",
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
          await updateAchievement(editingId, formDataObj);
        } else {
          await createAchievement(formDataObj);
        }
        setIsFormOpen(false);
        loadAchievements();
      } catch (error) {
        console.error("Failed to save achievement", error);
      }
    });
  };

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      try {
        await deleteAchievement(id);
        loadAchievements();
      } catch (error) {
        console.error("Failed to delete achievement", error);
      }
    });
  };

  const hackathons = achievements.filter(a => a.type === "hackathon");
  const others = achievements.filter(a => a.type === "achievement");

  const renderCards = (items: Achievement[]) => {
    if (items.length === 0) return <div className="text-gray-400 font-caveat text-xl py-4">None yet.</div>;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-[#f5f5f5] border border-black/10 rounded-xl overflow-hidden flex flex-col">
            <div className="h-48 bg-white border-b border-black/10 relative flex items-center justify-center overflow-hidden">
              {item.image_url ? (
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <span className="font-jersey text-xs text-gray-400">NO IMAGE</span>
              )}
            </div>
            
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="font-pt-serif text-xl font-bold mb-2">{item.title}</h3>
              <p className="font-caveat text-lg text-gray-600 mb-4 line-clamp-3">{item.description}</p>
              
              <div className="mt-auto">
                {item.perks && (
                  <span className="inline-block bg-black text-white px-3 py-1 rounded-full font-jersey text-xs uppercase tracking-wider mb-4">
                    {item.perks}
                  </span>
                )}
                <div className="flex items-center justify-end gap-1 pt-4 border-t border-black/5">
                  <button
                    onClick={() => handleOpenForm(item)}
                    className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </button>
                  <DeleteConfirm onConfirm={() => handleDelete(item.id)}>
                    <button
                      className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </DeleteConfirm>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="font-pt-serif text-3xl font-bold">Achievements</h1>
        <button
          onClick={() => handleOpenForm()}
          className="bg-black text-white rounded-full font-jersey uppercase tracking-widest text-xs px-6 py-2 flex items-center gap-2"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-[#f5f5f5] border border-black/10 rounded-xl p-6">
          <h2 className="font-pt-serif text-2xl mb-4">{editingId ? "Edit" : "Add"} Achievement</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Type</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none h-[42px]"
                >
                  <option value="hackathon">Hackathon Win</option>
                  <option value="achievement">Other Achievement</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Perks</label>
                <input
                  type="text"
                  value={formData.perks}
                  onChange={(e) => setFormData({ ...formData, perks: e.target.value })}
                  className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                  placeholder="e.g. Winner, Top 10"
                />
              </div>
              <div className="space-y-1">
                <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Image</label>
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

      <div className="space-y-6">
        <h2 className="font-pt-serif text-2xl flex items-center gap-2 border-b border-black/10 pb-2">
          <Trophy size={24} className="text-yellow-600" /> Hackathon Wins
        </h2>
        {renderCards(hackathons)}
      </div>

      <div className="space-y-6">
        <h2 className="font-pt-serif text-2xl flex items-center gap-2 border-b border-black/10 pb-2">
          <Award size={24} className="text-blue-600" /> Other Achievements
        </h2>
        {renderCards(others)}
      </div>
    </div>
  );
}

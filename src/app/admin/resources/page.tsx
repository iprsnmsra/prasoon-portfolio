"use client";

import { useState, useEffect, useTransition } from "react";
import { getResources, createResource, updateResource, deleteResource } from "@/lib/actions/resources";
import type { Resource } from "@/lib/types";
import FileUploader from "@/components/admin/FileUploader";
import DeleteConfirm from "@/components/admin/DeleteConfirm";
import { Edit2, Plus, Trash2, FileText, Download } from "lucide-react";

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    file_url: "",
  });

  const loadResources = async () => {
    try {
      const res = await getResources();
      if (res.success) setResources(res.data || []);
    } catch (error) {
      console.error("Failed to load resources", error);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const handleOpenForm = (resource?: Resource) => {
    if (resource) {
      setEditingId(resource.id);
      setFormData({
        title: resource.title || "",
        file_url: resource.file_url || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        file_url: "",
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
          await updateResource(editingId, formDataObj);
        } else {
          await createResource(formDataObj);
        }
        setIsFormOpen(false);
        loadResources();
      } catch (error) {
        console.error("Failed to save resource", error);
      }
    });
  };

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      try {
        await deleteResource(id);
        loadResources();
      } catch (error) {
        console.error("Failed to delete resource", error);
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-pt-serif text-3xl font-bold">Resources</h1>
        <button
          onClick={() => handleOpenForm()}
          className="bg-black text-white rounded-full font-jersey uppercase tracking-widest text-xs px-6 py-2 flex items-center gap-2"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-[#f5f5f5] border border-black/10 rounded-xl p-6 mb-8">
          <h2 className="font-pt-serif text-2xl mb-4">{editingId ? "Edit" : "Add"} Resource</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            
            <div className="space-y-1">
              <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">PDF File</label>
              <FileUploader
                value={formData.file_url}
                onChange={(url) => setFormData({ ...formData, file_url: url })}
                accept="application/pdf,.pdf"
              />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-[#f5f5f5] border border-black/10 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-white border border-black/10 rounded-lg flex items-center justify-center shrink-0">
              <FileText className="text-red-500" size={24} />
            </div>
            
            <div className="flex-grow min-w-0">
              <h3 className="font-pt-serif text-xl font-bold truncate">{resource.title}</h3>
              {resource.file_url && (
                <a 
                  href={resource.file_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-jersey uppercase tracking-wider text-gray-500 hover:text-black flex items-center gap-1 mt-1"
                >
                  <Download size={12} /> Download PDF
                </a>
              )}
            </div>
            
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => handleOpenForm(resource)}
                className="p-2 border border-black/10 rounded-xl hover:bg-white transition-colors"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
              <DeleteConfirm onConfirm={() => handleDelete(resource.id)}>
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
        {resources.length === 0 && !isFormOpen && (
          <div className="col-span-full text-center py-12 text-gray-400 font-caveat text-xl">
            No resources found. Add one!
          </div>
        )}
      </div>
    </div>
  );
}

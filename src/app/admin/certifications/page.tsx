"use client";

import { useState, useEffect, useTransition } from "react";
import { getCertifications, createCertification, updateCertification, deleteCertification } from "@/lib/actions/certifications";
import type { Certification } from "@/lib/types";
import FileUploader from "@/components/admin/FileUploader";
import DeleteConfirm from "@/components/admin/DeleteConfirm";
import { Edit2, Plus, Trash2, ExternalLink } from "lucide-react";

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    credential_url: "",
    image_url: "",
  });

  const loadCertifications = async () => {
    try {
      const res = await getCertifications();
      if (res.success) setCertifications(res.data || []);
    } catch (error) {
      console.error("Failed to load certifications", error);
    }
  };

  useEffect(() => {
    loadCertifications();
  }, []);

  const handleOpenForm = (cert?: Certification) => {
    if (cert) {
      setEditingId(cert.id);
      setFormData({
        title: cert.title || "",
        issuer: cert.issuer || "",
        date: cert.date || "",
        credential_url: cert.credential_url || "",
        image_url: cert.image_url || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        issuer: "",
        date: "",
        credential_url: "",
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
          await updateCertification(editingId, formDataObj);
        } else {
          await createCertification(formDataObj);
        }
        setIsFormOpen(false);
        loadCertifications();
      } catch (error) {
        console.error("Failed to save certification", error);
      }
    });
  };

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      try {
        await deleteCertification(id);
        loadCertifications();
      } catch (error) {
        console.error("Failed to delete certification", error);
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-pt-serif text-3xl font-bold">Certifications</h1>
        <button
          onClick={() => handleOpenForm()}
          className="bg-black text-white rounded-full font-jersey uppercase tracking-widest text-xs px-6 py-2 flex items-center gap-2"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-[#f5f5f5] border border-black/10 rounded-xl p-6 mb-8">
          <h2 className="font-pt-serif text-2xl mb-4">{editingId ? "Edit" : "Add"} Certification</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 md:col-span-2">
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
                <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Issuer</label>
                <input
                  type="text"
                  required
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Date</label>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                  placeholder="e.g. Aug 2024"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Credential URL</label>
                <input
                  type="url"
                  value={formData.credential_url}
                  onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
                  className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Certificate Image</label>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-[#f5f5f5] border border-black/10 rounded-xl overflow-hidden flex flex-col">
            <div className="h-40 bg-white border-b border-black/10 relative flex items-center justify-center overflow-hidden">
              {cert.image_url ? (
                <img src={cert.image_url} alt={cert.title} className="w-full h-full object-cover" />
              ) : (
                <span className="font-jersey text-xs text-gray-400">NO IMAGE</span>
              )}
            </div>
            
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="font-pt-serif text-xl font-bold mb-1 line-clamp-2">{cert.title}</h3>
              <p className="font-caveat text-lg text-gray-600 mb-4">{cert.issuer} &bull; {cert.date}</p>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-black/5">
                {cert.credential_url ? (
                  <a 
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-jersey text-xs uppercase tracking-wider flex items-center gap-1 hover:underline"
                  >
                    View Credential <ExternalLink size={12} />
                  </a>
                ) : (
                  <div />
                )}
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenForm(cert)}
                    className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </button>
                  <DeleteConfirm onConfirm={() => handleDelete(cert.id)}>
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
        {certifications.length === 0 && !isFormOpen && (
          <div className="col-span-full text-center py-12 text-gray-400 font-caveat text-xl">
            No certifications found. Add one!
          </div>
        )}
      </div>
    </div>
  );
}

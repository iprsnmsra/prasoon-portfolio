"use client";

import { useState, useEffect, useTransition } from "react";
import { changePassword, getPersonalInfo, updatePersonalInfo } from "@/lib/actions/settings";
import type { PersonalInfo } from "@/lib/types";
import FileUploader from "@/components/admin/FileUploader";
import { Save, Lock, User } from "lucide-react";

export default function SettingsPage() {
  const [isPending, startTransition] = useTransition();
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });
  const [infoMsg, setInfoMsg] = useState({ type: "", text: "" });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [infoForm, setInfoForm] = useState({
    name: "",
    role: "",
    tagline: "",
    email: "",
    github: "",
    linkedin: "",
    instagram: "",
    avatar_url: "",
  });

  const loadInfo = async () => {
    try {
      const res = await getPersonalInfo();
      if (res.success && res.data) {
        // @ts-ignore
        setInfoForm(res.data);
      }
    } catch (error) {
      console.error("Failed to load personal info", error);
    }
  };

  useEffect(() => {
    loadInfo();
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMsg({ type: "error", text: "New passwords do not match" });
      return;
    }
    
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("currentPassword", passwordForm.currentPassword);
        formData.append("newPassword", passwordForm.newPassword);
        
        const res = await changePassword(formData);
        if (res?.error) {
          setPasswordMsg({ type: "error", text: res.error });
        } else {
          setPasswordMsg({ type: "success", text: "Password changed successfully" });
          setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        }
      } catch (error) {
        setPasswordMsg({ type: "error", text: "An error occurred" });
      }
    });
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const formData = new FormData();
        Object.entries(infoForm).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const res = await updatePersonalInfo(formData);
        if (res?.error) {
          setInfoMsg({ type: "error", text: res.error });
        } else {
          setInfoMsg({ type: "success", text: "Personal info updated successfully" });
          loadInfo();
        }
      } catch (error) {
        setInfoMsg({ type: "error", text: "An error occurred" });
      }
    });
  };

  return (
    <div className="space-y-12 max-w-4xl">
      <div>
        <h1 className="font-pt-serif text-3xl font-bold mb-8">Settings</h1>
      </div>

      <div className="bg-[#f5f5f5] border border-black/10 rounded-xl p-8">
        <h2 className="font-pt-serif text-2xl mb-6 flex items-center gap-2">
          <User size={24} /> Personal Information
        </h2>
        
        {infoMsg.text && (
          <div className={`mb-6 px-4 py-3 rounded-xl font-caveat text-xl ${infoMsg.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
            {infoMsg.text}
          </div>
        )}

        <form onSubmit={handleInfoSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Name</label>
              <input
                type="text"
                value={infoForm.name}
                onChange={(e) => setInfoForm({ ...infoForm, name: e.target.value })}
                className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Role</label>
              <input
                type="text"
                value={infoForm.role}
                onChange={(e) => setInfoForm({ ...infoForm, role: e.target.value })}
                className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Tagline</label>
              <input
                type="text"
                value={infoForm.tagline}
                onChange={(e) => setInfoForm({ ...infoForm, tagline: e.target.value })}
                className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={infoForm.email}
                onChange={(e) => setInfoForm({ ...infoForm, email: e.target.value })}
                className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">GitHub</label>
              <input
                type="text"
                value={infoForm.github}
                onChange={(e) => setInfoForm({ ...infoForm, github: e.target.value })}
                className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">LinkedIn</label>
              <input
                type="text"
                value={infoForm.linkedin}
                onChange={(e) => setInfoForm({ ...infoForm, linkedin: e.target.value })}
                className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Instagram</label>
              <input
                type="text"
                value={infoForm.instagram}
                onChange={(e) => setInfoForm({ ...infoForm, instagram: e.target.value })}
                className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Avatar Image</label>
              <FileUploader
                value={infoForm.avatar_url}
                onChange={(url) => setInfoForm({ ...infoForm, avatar_url: url })}
                accept="image/*"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="bg-black text-white rounded-full font-jersey uppercase tracking-widest text-xs px-6 py-2 disabled:opacity-50 flex items-center gap-2"
          >
            <Save size={14} /> {isPending ? "Saving..." : "Save Info"}
          </button>
        </form>
      </div>

      <div className="bg-[#f5f5f5] border border-black/10 rounded-xl p-8">
        <h2 className="font-pt-serif text-2xl mb-2 flex items-center gap-2">
          <Lock size={24} /> Change Password
        </h2>
        <p className="font-caveat text-gray-500 mb-6 text-lg">Default CMS password: Pr@s00n_CMS_2026!</p>
        
        {passwordMsg.text && (
          <div className={`mb-6 px-4 py-3 rounded-xl font-caveat text-xl ${passwordMsg.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
            {passwordMsg.text}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-md">
          <div className="space-y-1">
            <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Current Password</label>
            <input
              type="password"
              required
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">New Password</label>
            <input
              type="password"
              required
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="font-jersey text-xs text-gray-400 uppercase tracking-wider">Confirm New Password</label>
            <input
              type="password"
              required
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              className="w-full bg-white border border-black/10 rounded-xl px-4 py-2 font-caveat text-lg focus:border-black/30 outline-none"
            />
          </div>
          
          <button
            type="submit"
            disabled={isPending}
            className="bg-black text-white rounded-full font-jersey uppercase tracking-widest text-xs px-6 py-2 disabled:opacity-50 flex items-center gap-2"
          >
            <Save size={14} /> {isPending ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

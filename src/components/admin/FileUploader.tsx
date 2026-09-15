'use client'

import { useState, useRef } from 'react';
import { UploadCloud, File, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface FileUploaderProps {
  onUpload?: (url: string) => void;
  onChange?: (url: string) => void;
  accept?: string;
  label?: string;
  currentUrl?: string;
  value?: string;
}

export default function FileUploader({ 
  onUpload,
  onChange,
  accept = 'image/*', 
  label = 'Upload File',
  currentUrl,
  value
}: FileUploaderProps) {
  const finalCurrentUrl = value || currentUrl;
  const finalOnUpload = onChange || onUpload || (() => {});
  
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      finalOnUpload(data.url);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const isImage = finalCurrentUrl?.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i);

  return (
    <div className="space-y-2 w-full">
      {label && <label className="block text-sm font-jersey uppercase tracking-widest">{label}</label>}
      
      {finalCurrentUrl && !isUploading ? (
        <div className="relative rounded-xl border border-black/10 bg-[#f5f5f5] p-2 flex items-center justify-center overflow-hidden h-40 group">
          {isImage ? (
            <div className="relative w-full h-full">
              <Image src={finalCurrentUrl} alt="Preview" fill className="object-contain" />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <File className="w-10 h-10 text-black/60 mb-2" />
              <span className="text-sm font-caveat">{finalCurrentUrl.split('/').pop()}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              onClick={() => inputRef.current?.click()}
              className="bg-white text-black px-4 py-2 rounded-full font-jersey uppercase tracking-widest text-xs"
            >
              Replace
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => !isUploading && inputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl h-40 flex flex-col items-center justify-center p-6 cursor-pointer transition-colors duration-200
            ${dragActive ? 'border-black bg-black/5' : 'border-black/20 hover:border-black/40 bg-[#f5f5f5]'}
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isUploading ? (
            <Loader2 className="w-8 h-8 animate-spin text-black" />
          ) : (
            <>
              <UploadCloud className="w-8 h-8 text-black/60 mb-2" />
              <p className="text-sm font-caveat text-black/80 text-center">
                Drag & drop or click to browse
              </p>
              <span className="text-xs text-black/40 mt-1 uppercase font-jersey tracking-widest">
                {accept}
              </span>
            </>
          )}
        </div>
      )}
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept={accept}
        className="hidden"
      />
    </div>
  );
}

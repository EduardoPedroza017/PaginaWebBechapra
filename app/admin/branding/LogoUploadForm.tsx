import React, { useRef } from "react";
import { TranslateText } from '@/components/TranslateText';

interface LogoUploadFormProps {
  uploading: boolean;
  onUpload: (file: File) => void;
}

export const LogoUploadForm: React.FC<LogoUploadFormProps> = ({ uploading, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      onUpload(file);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <label className="block mb-2 font-medium"><TranslateText text="Subir nuevo logo:" /></label>
      <input type="file" accept="image/*" ref={fileInputRef} className="mb-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={uploading}>
        {uploading ? <TranslateText text="Subiendo..." /> : <TranslateText text="Subir logo" />}
      </button>
    </form>
  );
};

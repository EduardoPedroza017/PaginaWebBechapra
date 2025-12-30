import React, { useState } from 'react';

interface FileUploadFormProps {
  onFileUpload: (file: File, internshipId: string) => void;
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [internshipId, setInternshipId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file && internshipId) {
      onFileUpload(file, internshipId);
      setFile(null);
      setInternshipId('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={internshipId}
        onChange={(e) => setInternshipId(e.target.value)}
        placeholder="ID del programa"
        required
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        required
      />
      <button type="submit">Subir Archivo</button>
    </form>
  );
};

export default FileUploadForm;
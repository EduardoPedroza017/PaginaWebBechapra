import React from "react";
import { TranslateText } from '@/components/TranslateText';

interface Logo {
  filename: string;
  path?: string;
  upload_date?: string;
  size?: number;
}

interface LogoHistoryProps {
  logoHistory: Logo[];
  onSelectLogo: (filename: string) => void;
}

export const LogoHistory: React.FC<LogoHistoryProps> = ({ logoHistory, onSelectLogo }) => (
  <div>
    <h2 className="text-lg font-semibold mb-2"><TranslateText text="Historial de logos:" /></h2>
    <div className="grid grid-cols-2 gap-4">
      {logoHistory.map((logo) => (
        <div key={logo.filename} className="border rounded p-2 flex flex-col items-center">
          <img src={`http://localhost:5000/uploads/branding/${logo.filename}`} alt={logo.filename} className="h-16 mb-1" />
          <div className="text-xs text-slate-500 mb-1">{logo.filename}</div>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
            onClick={() => onSelectLogo(logo.filename)}
          ><TranslateText text="Usar este logo" /></button>
        </div>
      ))}
    </div>
  </div>
);

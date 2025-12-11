import React from "react";
import { TranslateText } from '@/components/TranslateText';

interface CurrentLogoProps {
  currentLogo: string | null;
}

export const CurrentLogo: React.FC<CurrentLogoProps> = ({ currentLogo }) => (
  <div className="mb-8">
    <h2 className="text-lg font-semibold mb-2"><TranslateText text="Logo actual:" /></h2>
    {currentLogo ? (
      <img src={`http://localhost:5000${currentLogo}`} alt="Logo actual" className="h-20 mb-2" />
    ) : (
      <div className="text-slate-500"><TranslateText text="No hay logo cargado." /></div>
    )}
  </div>
);

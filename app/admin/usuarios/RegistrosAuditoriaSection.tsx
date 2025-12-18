"use client";

import AuditLog from "../dashboard/AuditLog";
import dynamic from "next/dynamic";

// Importación dinámica para evitar SSR issues
const AdminAuditLogSection = dynamic(() => import("../dashboard/AdminAuditLogSection"), { ssr: false });

export default function RegistrosAuditoriaSection({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  // Muestra ambas secciones: accesos y acciones administrativas
  return (
    <div className="mt-8 flex flex-col gap-12">
      <div>
        <h2 className="text-xl font-bold mb-2">Registros de Acceso</h2>
        <AuditLog theme={theme} />
      </div>
      <div>
        <AdminAuditLogSection />
      </div>
    </div>
  );
}

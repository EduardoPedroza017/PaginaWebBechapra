"use client";

import { saveAs } from "file-saver";
import { TranslateText } from "@/components/TranslateText";

interface AuditLogEntry {
  user_id: string;
  timestamp?: string;
  ip?: string;
  user_agent?: string;
  success: boolean;
  reason?: string;
}

export function ExportAuditLogsButton({ logs }: { logs: AuditLogEntry[] }) {
  const handleExport = () => {
    if (!logs || logs.length === 0) return;
    const csvRows = [
      [
        "Usuario",
        "Fecha/Hora",
        "IP",
        "User Agent",
        "Éxito",
        "Motivo"
      ].join(","),
      ...logs.map((log) =>
        [
          log.user_id,
          log.timestamp ? new Date(log.timestamp).toLocaleString() : "",
          log.ip || "",
          log.user_agent ? '"' + log.user_agent.replace(/"/g, '""') + '"' : "",
          log.success ? "SI" : "NO",
          log.reason ? '"' + log.reason.replace(/"/g, '""') + '"' : "-"
        ].join(",")
      ),
    ];
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `logs_auditoria_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  return (
    <button
      onClick={handleExport}
      className="mb-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors shadow flex items-center gap-2"
      title="Exportar logs a CSV"
    >
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 16v-8m0 8l-4-4m4 4l4-4M4 20h16"/></svg>
      <TranslateText text="Exportar logs" />
    </button>
  );
}

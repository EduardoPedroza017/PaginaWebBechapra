import { Server } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface DBServerInfoProps {
  theme: "light" | "dark";
  loading: boolean;
  error: boolean;
  dbName: string;
  host: string;
  version: string;
}

export function DBServerInfo({ theme, loading, error, dbName, host, version }: DBServerInfoProps) {
  return (
    <div className={`rounded-2xl p-5 border ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
      <div className="flex items-center gap-2 mb-4">
        <Server className={theme === "dark" ? "text-blue-400" : "text-blue-600"} size={18} />
        <h2 className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <TranslateText text="Información del Servidor" />
        </h2>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl p-3 text-red-600 dark:text-red-400 text-sm">
          <TranslateText text="Error al cargar" />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
            <span className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Base de datos</span>
            <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{dbName}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
            <span className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Host</span>
            <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"} truncate max-w-[150px]`}>{host}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
            <span className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Versión</span>
            <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{version}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Estado</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
              Conectado
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

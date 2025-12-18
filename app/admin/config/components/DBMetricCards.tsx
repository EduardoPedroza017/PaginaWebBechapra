import { Database, HardDrive, Layers, Users, Clock, Activity, Server } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface DBMetricCardsProps {
  theme: "light" | "dark";
  loading: boolean;
  error: boolean;
  totalSize: number;
  totalDocs: number;
  connections: number;
  uptime: number;
  collectionsCount: number;
  totalIndexSize: number;
  avgDocSize: number;
  version: string;
}

export function DBMetricCards({
  theme, loading, error, totalSize, totalDocs, connections, uptime, collectionsCount, totalIndexSize, avgDocSize, version
}: DBMetricCardsProps) {
  return (
    <>
      {/* Tarjetas de métricas principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Tamaño total */}
        <div className={`rounded-2xl p-5 border transition-all hover:shadow-md ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                <TranslateText text="Tamaño Total" />
              </p>
              <p className="text-2xl font-semibold text-blue-500">
                {loading ? "..." : error ? "N/A" : `${(totalSize / 1024 / 1024).toFixed(2)} MB`}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>
        {/* Documentos */}
        <div className={`rounded-2xl p-5 border transition-all hover:shadow-md ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                <TranslateText text="Documentos" />
              </p>
              <p className="text-2xl font-semibold text-green-500">
                {loading ? "..." : error ? "N/A" : totalDocs.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </div>
        {/* Conexiones */}
        <div className={`rounded-2xl p-5 border transition-all hover:shadow-md ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                <TranslateText text="Conexiones" />
              </p>
              <p className="text-2xl font-semibold text-purple-500">
                {loading ? "..." : error ? "N/A" : connections ?? "N/A"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-500" />
            </div>
          </div>
        </div>
        {/* Uptime */}
        <div className={`rounded-2xl p-5 border transition-all hover:shadow-md ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                <TranslateText text="Uptime" />
              </p>
              <p className="text-2xl font-semibold text-amber-500">
                {loading ? "..." : error ? "N/A" : uptime}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
          </div>
        </div>
      </div>
      {/* Segunda fila de métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Colecciones */}
        <div className={`rounded-2xl p-5 border transition-all hover:shadow-md ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                <TranslateText text="Colecciones" />
              </p>
              <p className="text-2xl font-semibold text-cyan-500">
                {loading ? "..." : error ? "N/A" : collectionsCount}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <Database className="w-5 h-5 text-cyan-500" />
            </div>
          </div>
        </div>
        {/* Tamaño índices */}
        <div className={`rounded-2xl p-5 border transition-all hover:shadow-md ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                <TranslateText text="Tamaño Índices" />
              </p>
              <p className="text-2xl font-semibold text-pink-500">
                {loading ? "..." : error ? "N/A" : `${(totalIndexSize / 1024 / 1024).toFixed(2)} MB`}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-pink-500" />
            </div>
          </div>
        </div>
        {/* Prom. Doc */}
        <div className={`rounded-2xl p-5 border transition-all hover:shadow-md ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                <TranslateText text="Prom. Doc" />
              </p>
              <p className="text-2xl font-semibold text-orange-500">
                {loading ? "..." : error ? "N/A" : `${(avgDocSize / 1024).toFixed(2)} KB`}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Server className="w-5 h-5 text-orange-500" />
            </div>
          </div>
        </div>
        {/* Versión */}
        <div className={`rounded-2xl p-5 border transition-all hover:shadow-md ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                <TranslateText text="Versión" />
              </p>
              <p className="text-2xl font-semibold text-indigo-500">
                {loading ? "..." : error ? "N/A" : version}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
              <span className="text-indigo-500 text-lg">🍃</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

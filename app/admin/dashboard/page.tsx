"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { WelcomeCard } from "./WelcomeCard";
import { TranslateText } from "@/components/TranslateText";
import {
  LayoutDashboard,
  AlertCircle,
  RefreshCw,
  Activity,
  Zap,
  BarChart3,
  Shield,
  ChevronRight,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import CookieConsentAdmin from "../cookie/CookieConsentAdminNew";
import DashboardStats from "./DashboardStats";
import QuickActions from "./QuickActions";
import { WebVitalsWidget } from "@/lib/utils/web-vitals";
import { useAuth, useTheme } from "../hooks";
import { motion, AnimatePresence } from "framer-motion";

// Auditoría
import AuditLog from "./AuditLog";
import AdminAuditLogSection from "./AdminAuditLogSection";

type TabId = "dashboard" | "actions" | "audit" | "monitoring" | "cookies";

export default function AdminDashboard() {
  const router = useRouter();
  const { admin, role, authorized, loading: authLoading, logout } = useAuth();
  const { theme, toggleTheme, themeReady } = useTheme();

  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");

  const [loadingTabs, setLoadingTabs] = useState<Record<TabId, boolean>>({
    dashboard: false,
    actions: false,
    audit: false,
    monitoring: false,
    cookies: false,
  });

  const [systemStatus] = useState({
    online: true,
    latency: 42,
    lastSync: "hoy 09:15",
  });

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleTabChange = async (tabId: TabId) => {
    setLoadingTabs((prev) => ({ ...prev, [tabId]: true }));
    await new Promise((r) => setTimeout(r, 300));
    setActiveTab(tabId);
    setLoadingTabs((prev) => ({ ...prev, [tabId]: false }));
  };

  const getTabs = () => {
    const baseTabs = [
      {
        id: "dashboard" as TabId,
        label: "Dashboard",
        icon: <LayoutDashboard size={18} />,
        description: "Estadísticas generales del sistema",
      },
      {
        id: "actions" as TabId,
        label: "Acciones",
        icon: <Zap size={18} />,
        description: "Accesos rápidos y atajos",
      },
      {
        id: "monitoring" as TabId,
        label: "Monitoreo",
        icon: <BarChart3 size={18} />,
        description: "Métricas y rendimiento en tiempo real",
      },
      {
        id: "cookies" as TabId,
        label: "Cookies",
        icon: <Shield size={18} />,
        description: "Privacidad y consentimiento",
      },
    ];

    if (role === "superadmin" || role === "admin") {
      baseTabs.splice(2, 0, {
        id: "audit" as TabId,
        label: "Auditoría",
        icon: <Activity size={18} />,
        description: "Logs y seguridad",
      });
    }

    return baseTabs;
  };

  const tabs = getTabs();
  const activeTabInfo = tabs.find((t) => t.id === activeTab);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#audit-log") {
      handleTabChange("audit");
    }
  }, []);

  if (authLoading || !themeReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="w-10 h-10 mx-auto text-red-500" />
          <p>No tienes permisos</p>
          <button onClick={() => router.push("/admin")}>Volver</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar selected="/admin/dashboard" theme={theme} role={role} admin={admin} />

      <div className="flex-1 flex flex-col">
        <Header
          onLogout={logout}
          onToggleTheme={toggleTheme}
          theme={theme}
          role={role}
          admin={admin}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          <WelcomeCard role={role} theme={theme} />

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                disabled={loadingTabs[tab.id]}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800"
                }`}
              >
                {loadingTabs[tab.id] ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  tab.icon
                )}
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "dashboard" && (
                <DashboardStats key={refreshKey} theme={theme} role={role} />
              )}

              {activeTab === "actions" && (
                <QuickActions theme={theme} role={role} />
              )}

              {activeTab === "audit" && (
                <div id="audit-log">
                  {role === "superadmin" ? (
                    <AdminAuditLogSection />
                  ) : (
                    <AuditLog theme={theme} />
                  )}
                </div>
              )}

              {activeTab === "monitoring" && (
                <WebVitalsWidget theme={theme} />
              )}

              {activeTab === "cookies" && (
                <CookieConsentAdmin key={refreshKey} theme={theme} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nota */}
          <div className="mt-6 p-4 border rounded-xl flex gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-500" />
            <p className="text-sm">
              Consejo: navega por las pestañas para acceder a cada sección del
              panel.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

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
import DashboardLayout from "../components/layout/DashboardLayout";

type TabId = "dashboard" | "actions" | "audit" | "monitoring" | "cookies";

export default function AdminDashboard() {
  const router = useRouter();
  const { admin, role, authorized, loading: authLoading, logout } = useAuth();
  const { theme: maybeTheme, resolvedTheme, toggleTheme, themeReady } = useTheme();

  // Normalize theme to the narrow union expected by child components
  type ThemeMode = 'light' | 'dark' | undefined;
  const theme: ThemeMode = resolvedTheme === 'dark' ? 'dark' : resolvedTheme === 'light' ? 'light' : (maybeTheme === 'dark' ? 'dark' : maybeTheme === 'light' ? 'light' : undefined);
  // Provide a strict fallback for components that expect non-optional theme
  const themeStrict: 'light' | 'dark' = theme === 'dark' ? 'dark' : 'light';

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
      // Use a microtask to avoid cascading renders
      Promise.resolve().then(() => handleTabChange("audit"));
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
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto w-full px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-2">
            <DashboardLayout>
              <WelcomeCard role={role} theme={themeStrict} />

              {/* Tabs */}
              <div className="col-span-2 flex gap-2 mb-6">
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
            </DashboardLayout>
          </div>

          <aside className="col-span-1 space-y-6">
            <div className="sticky top-6">
              <QuickActions theme={themeStrict} role={role} />
              <div className="mt-4">
                <WebVitalsWidget theme={themeStrict} />
              </div>
              <div className="mt-4">
                <CookieConsentAdmin key={refreshKey} theme={themeStrict} />
              </div>
            </div>
          </aside>
        </div>

        {/* Nota */}
        <div className="mt-6 p-4 border rounded-xl flex gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-500" />
          <p className="text-sm">
            Consejo: navega por las pestañas para acceder a cada sección del
            panel.
          </p>
        </div>
      </div>
    </div>
  );
}


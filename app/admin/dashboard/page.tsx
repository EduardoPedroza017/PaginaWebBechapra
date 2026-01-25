"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import { 
  LayoutDashboard, 
  AlertCircle, 
  BarChart3, 
  Zap, 
  Shield,
  Activity,
  Loader2
} from "lucide-react";

import { useAuth, useTheme } from "../hooks";
import { motion, AnimatePresence } from "framer-motion";

import AdminPageHeader from "../components/ui/AdminPageHeader";
import AdminTabs, { TabItem } from "../components/ui/AdminTabs";
import AdminSection from "../components/ui/AdminSection";

// Import new section components
import { DashboardOverview } from "./sections/DashboardOverview";
import { DashboardFullStats } from "./sections/DashboardFullStats";
import { DashboardActions } from "./sections/DashboardActions";
import { DashboardMonitoring } from "./sections/DashboardMonitoring";

// Import existing components
import CookieConsentAdmin from "../cookie/CookieConsentAdminNew";
import AdminAuditLogSection from "./AdminAuditLogSection";

// Type for tab IDs
type TabId = "overview" | "stats" | "actions" | "monitoring" | "cookies" | "audit";

export default function AdminDashboard() {
  const router = useRouter();
  const { role, authorized, loading: authLoading } = useAuth();
  const { theme: maybeTheme, resolvedTheme, themeReady } = useTheme();

  type ThemeMode = 'light' | 'dark' | undefined;
  const theme: ThemeMode = resolvedTheme === 'dark' ? 'dark' : resolvedTheme === 'light' ? 'light' : (maybeTheme === 'dark' ? 'dark' : maybeTheme === 'light' ? 'light' : undefined);
  const themeStrict: 'light' | 'dark' = theme === 'dark' ? 'dark' : 'light';

  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const [loadingTabs, setLoadingTabs] = useState<Record<TabId, boolean>>({
    overview: false,
    stats: false,
    actions: false,
    monitoring: false,
    cookies: false,
    audit: false,
  });

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleTabChange = async (tabId: TabId) => {
    setLoadingTabs((prev) => ({ ...prev, [tabId]: true }));
    await new Promise((r) => setTimeout(r, 150));
    setActiveTab(tabId);
    setLoadingTabs((prev) => ({ ...prev, [tabId]: false }));
  };

  const getTabs = (): TabItem[] => {
    const baseTabs: TabItem[] = [
      { id: "overview", label: "Resumen", icon: <LayoutDashboard size={18} /> },
      { id: "stats", label: "Estadísticas", icon: <BarChart3 size={18} /> },
      { id: "actions", label: "Acciones", icon: <Zap size={18} /> },
      { id: "monitoring", label: "Monitoreo", icon: <Activity size={18} /> },
      { id: "cookies", label: "Cookies", icon: <Shield size={18} /> },
    ];

    if (role === "superadmin" || role === "admin") {
      baseTabs.push({ id: "audit", label: "Auditoría", icon: <Activity size={18} /> });
    }

    return baseTabs;
  };

  const tabs = getTabs();

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#audit-log") {
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

  const roleLabel = role === 'superadmin' ? 'Super Administrador' : role === 'admin' ? 'Administrador' : role || 'Usuario';

  return (
    <div className="min-h-screen pb-20">
      <AdminPageHeader
        title="Panel de Administración"
        subtitle={`Bienvenido de nuevo, ${roleLabel}`}
        icon={<LayoutDashboard className="w-6 h-6 text-white" />}
        iconColor="blue"
        theme={themeStrict}
        actions={{
          refresh: { onClick: handleRefresh, loading: loadingTabs.overview }
        }}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Dashboard" }]}
      />

      <AdminTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tabId) => handleTabChange(tabId as TabId)}
        loadingTabs={loadingTabs}
        theme={themeStrict}
        variant="pills"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-4"
        >
          {/* TAB 1: Resumen - Vista general compacta */}
          {activeTab === "overview" && (
            <AdminSection theme={themeStrict}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <DashboardOverview role={role} theme={themeStrict} />
                </div>
                <div className="space-y-4">
                  {/* Mini stats en sidebar del overview */}
                  <DashboardActions theme={themeStrict} role={role} />
                </div>
              </div>
            </AdminSection>
          )}

          {/* TAB 2: Estadísticas - Dashboard completo */}
          {activeTab === "stats" && (
            <AdminSection theme={themeStrict}>
              <DashboardFullStats theme={themeStrict} />
            </AdminSection>
          )}

          {/* TAB 3: Acciones - Solo QuickActions */}
          {activeTab === "actions" && (
            <AdminSection theme={themeStrict}>
              <DashboardActions theme={themeStrict} role={role} />
            </AdminSection>
          )}

          {/* TAB 4: Monitoreo - WebVitals y métricas del servidor */}
          {activeTab === "monitoring" && (
            <AdminSection theme={themeStrict}>
              <DashboardMonitoring theme={themeStrict} />
            </AdminSection>
          )}

          {/* TAB 5: Cookies */}
          {activeTab === "cookies" && (
            <AdminSection theme={themeStrict}>
              <CookieConsentAdmin key={refreshKey} theme={themeStrict} />
            </AdminSection>
          )}

          {/* TAB 6: Auditoría - Solo para admins */}
          {activeTab === "audit" && (
            <AdminSection theme={themeStrict}>
              <AdminAuditLogSection />
            </AdminSection>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


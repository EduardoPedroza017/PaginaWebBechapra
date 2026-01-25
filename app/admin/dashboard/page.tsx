"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import { WelcomeCard } from "./WelcomeCard";
import { TranslateText } from "@/components/TranslateText";
import {
  LayoutDashboard,
  AlertCircle,
  Activity,
  Zap,
  BarChart3,
  Shield,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import CookieConsentAdmin from "../cookie/CookieConsentAdminNew";
import DashboardStats from "./DashboardStats";
import QuickActions from "./QuickActions";
import { WebVitalsWidget } from "@/lib/utils/web-vitals";
import { useAuth, useTheme } from "../hooks";
import { motion, AnimatePresence } from "framer-motion";

import AdminAuditLogSection from "./AdminAuditLogSection";
import AdminPageHeader from "../components/ui/AdminPageHeader";
import AdminTabs, { TabItem } from "../components/ui/AdminTabs";
import AdminSection from "../components/ui/AdminSection";
import { GRID_COLS } from "../design-system";

type TabId = "dashboard" | "actions" | "audit" | "monitoring" | "cookies";

export default function AdminDashboard() {
  const router = useRouter();
  const { role, authorized, loading: authLoading } = useAuth();
  const { theme: maybeTheme, resolvedTheme, themeReady } = useTheme();

  type ThemeMode = 'light' | 'dark' | undefined;
  const theme: ThemeMode = resolvedTheme === 'dark' ? 'dark' : resolvedTheme === 'light' ? 'light' : (maybeTheme === 'dark' ? 'dark' : maybeTheme === 'light' ? 'light' : undefined);
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

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleTabChange = async (tabId: TabId) => {
    setLoadingTabs((prev) => ({ ...prev, [tabId]: true }));
    await new Promise((r) => setTimeout(r, 300));
    setActiveTab(tabId);
    setLoadingTabs((prev) => ({ ...prev, [tabId]: false }));
  };

  const getTabs = (): TabItem[] => {
    const baseTabs: TabItem[] = [
      { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
      { id: "actions", label: "Acciones", icon: <Zap size={18} /> },
      { id: "monitoring", label: "Monitoreo", icon: <BarChart3 size={18} /> },
      { id: "cookies", label: "Cookies", icon: <Shield size={18} /> },
    ];

    if (role === "superadmin" || role === "admin") {
      baseTabs.splice(2, 0, { id: "audit", label: "Auditoría", icon: <Activity size={18} /> });
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
    <div className="min-h-screen">
      <AdminPageHeader
        title="Panel de Administración"
        subtitle={`Bienvenido de nuevo, ${roleLabel}`}
        icon={<LayoutDashboard className="w-6 h-6 text-white" />}
        iconColor="blue"
        theme={themeStrict}
        actions={{
          refresh: { onClick: handleRefresh, loading: loadingTabs.dashboard }
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
        >
          {activeTab === "dashboard" && (
            <AdminSection theme={themeStrict}>
              <div className={GRID_COLS[2]}>
                <div className="col-span-2 lg:col-span-2">
                  <WelcomeCard role={role} theme={themeStrict} />
                  <div className="mt-6">
                    <DashboardStats theme={themeStrict} />
                  </div>
                </div>
                <aside className="col-span-1 space-y-6">
                  <QuickActions theme={themeStrict} role={role} />
                  <div className="mt-4">
                    <WebVitalsWidget theme={themeStrict} />
                  </div>
                  <div className="mt-4">
                    <CookieConsentAdmin key={refreshKey} theme={themeStrict} />
                  </div>
                </aside>
              </div>
            </AdminSection>
          )}

          {activeTab === "actions" && (
            <AdminSection theme={themeStrict}>
              <QuickActions theme={themeStrict} role={role} />
            </AdminSection>
          )}

          {activeTab === "audit" && (
            <AdminSection theme={themeStrict}>
              <AdminAuditLogSection theme={themeStrict} />
            </AdminSection>
          )}

          {activeTab === "monitoring" && (
            <AdminSection theme={themeStrict}>
              <div className="space-y-6">
                <DashboardStats theme={themeStrict} />
                <WebVitalsWidget theme={themeStrict} />
              </div>
            </AdminSection>
          )}

          {activeTab === "cookies" && (
            <AdminSection theme={themeStrict}>
              <CookieConsentAdmin key={refreshKey} theme={themeStrict} />
            </AdminSection>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 p-4 border rounded-xl flex gap-3">
        <AlertTriangle className="w-5 h-5 text-blue-500 shrink-0" />
        <p className="text-sm">
          Consejo: navega por las pestaas para acceder a cada seccion del panel.
        </p>
      </div>
    </div>
  );
}

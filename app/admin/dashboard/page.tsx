"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { 
  LayoutDashboard, 
  Shield,
  Loader2
} from "lucide-react";

import { useAuth, useTheme } from "../hooks";
import { motion, AnimatePresence } from "framer-motion";

import AdminPageHeader from "../components/ui/AdminPageHeader";
import AdminTabs, { TabItem } from "../components/ui/AdminTabs";
import AdminSection from "../components/ui/AdminSection";

const DashboardOverview = dynamic(
  () => import("./sections/DashboardOverview"),
  { loading: () => <div className="h-96 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" /> }
);

const CookieConsentAdmin = dynamic(
  () => import("../cookie/CookieConsentAdminNew"),
  { loading: () => <div className="h-96 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />, ssr: false }
);

// Type for tab IDs
type TabId = "overview" | "cookies";

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
    cookies: false,
  });

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleTabChange = useCallback(async (tabId: TabId) => {
    setLoadingTabs((prev) => ({ ...prev, [tabId]: true }));
    await new Promise((r) => setTimeout(r, 150));
    setActiveTab(tabId);
    setLoadingTabs((prev) => ({ ...prev, [tabId]: false }));
  }, []);

  const getTabs = useCallback((): TabItem[] => {
    const baseTabs: TabItem[] = [
      { id: "overview", label: "Resumen", icon: <LayoutDashboard size={18} /> },
      { id: "cookies", label: "Cookies", icon: <Shield size={18} /> },
    ];

    return baseTabs;
  }, []);

  const tabs = getTabs();

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
        <p>No tienes permiso para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <AdminPageHeader title="Panel de Administración" />
      
      <AdminTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onChange={(id) => handleTabChange(id as TabId)} 
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "overview" && (
            <DashboardOverview role={role} theme={themeStrict} />
          )}

          {activeTab === "cookies" && (
            <CookieConsentAdmin key={refreshKey} theme={themeStrict} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

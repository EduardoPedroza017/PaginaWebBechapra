import { SidebarProvider } from '@/contexts/SidebarContext';
import AdminLayoutClient from './AdminLayoutClient';
import AdminThemeProvider from './providers/ThemeProvider';

export const metadata = {
  title: 'Admin - Sistema Administrativo'
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <SidebarProvider>
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </SidebarProvider>
    </AdminThemeProvider>
  );
}

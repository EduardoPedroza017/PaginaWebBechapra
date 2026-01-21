import AdminLayoutClient from './AdminLayoutClient';

export const metadata = {
  title: 'Admin - Sistema Administrativo'
};

export default function AdminLayout({ children }: { children: React.ReactNode }){
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}

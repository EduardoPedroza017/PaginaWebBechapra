// app/servicios/layout.tsx
export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="space-y-6">{children}</div>;
}

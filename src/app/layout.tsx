// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import SideNav from "@/ui/sidenav";

export const metadata: Metadata = {
  title: "App de Salud",
  description: "Registro de visitas de cuidadores domiciliarios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-900 text-white min-h-screen">
        <main className="flex flex-col md:flex-row min-h-screen">
          <SideNav />
          <div className="flex-1 p-6">{children}</div>
        </main>
      </body>
    </html>
  );
}

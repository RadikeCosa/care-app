import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-[var(--background)] text-[var(--foreground)]">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Sistema de Formularios de Salud
      </h1>
      <p className="text-center max-w-md mb-8">
        Plataforma para el registro y seguimiento de visitas de cuidadores a
        pacientes. Registre información detallada y genere reportes completos.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/care-form"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        >
          Formulario de Cuidadores
        </Link>
        <Link
          href="/reportes"
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 text-center"
        >
          Ver Reportes
        </Link>
      </div>
    </div>
  );
}

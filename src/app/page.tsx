import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">
        Bienvenido al sistema de formularios de salud
      </h1>
      <Link href="/care-form" className="text-blue-500 hover:underline text-lg">
        Ir al formulario de cuidadores
      </Link>
    </div>
  );
}

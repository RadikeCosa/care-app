// components/SideNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const links = [
  { name: "Inicio", href: "/", icon: HomeIcon },
  { name: "Form de Cuidadores", href: "/care-form", icon: ClipboardIcon },
  {
    name: "Form RSV",
    href: "/vital-signs",
    icon: ClipboardIcon,
  },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white w-full md:w-60 flex md:flex-col p-2 gap-2 justify-around md:justify-start">
      {links.map(({ name, href, icon: Icon }) => (
        <Link
          key={name}
          href={href}
          className={clsx(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition w-full justify-center md:justify-start",
            pathname === href
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-700 text-gray-300 hover:text-white"
          )}
        >
          <Icon className="w-5 h-5" />
          <span className="hidden md:inline">{name}</span>
        </Link>
      ))}
    </nav>
  );
}

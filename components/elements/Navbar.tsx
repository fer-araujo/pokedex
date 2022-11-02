import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from 'next/link'
import Image from "next/image";

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="w-full p-4 flex flex-row items-center px-10 bg-neutral-200 dark:bg-neutral-800"
    >
      <Link href="/" className="w-full flex justify-start items-center cursor-pointer">
        <div className="w-1/8 mx-2">
          <Image src="/images/pokeball.png" alt="icon" width={35} height={35} />
        </div>

        <p className="w-7/8 mx-2 text-2xl font-Poppins font-extrabold text-neutral-700 dark:text-white">
          My Pokedex
        </p>
      </Link>
      <div className="w-full flex justify-end">
        <button
          className="mx-2 bg-stone-700 bg-transparent text-black dark:text-white"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          Toggle to {theme === "light" ? "dark" : "light"}
        </button>
        <Link href="/favorites">
          <p className="mx-2">Favorites</p>
        </Link>
      </div>
    </div>
  );
};

import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional: install lucide-react for nice icons

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
          Budget<span className="text-emerald-400">Buddy</span>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-3xl">
          <a
            href="#"
            className="hover:text-emerald-400 transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="#calculator"
            className="hover:text-emerald-400 transition-colors duration-300"
          >
            Calculator
          </a>
          <a
            href="#about"
            className="hover:text-emerald-400 transition-colors duration-300"
          >
            About
          </a>
        </nav>

        {/* Hamburger icon */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-4 p-2 mt-4 text-lg text-center">
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="hover:text-emerald-400 transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="#calculator"
            onClick={() => setMenuOpen(false)}
            className="hover:text-emerald-400 transition-colors duration-300"
          >
            Calculator
          </a>
          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
            className="hover:text-emerald-400 transition-colors duration-300"
          >
            About
          </a>
        </nav>
      )}
    </header>
  );
}

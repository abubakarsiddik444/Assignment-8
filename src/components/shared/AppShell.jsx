"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLogIn, FiLogOut, FiMenu, FiUserPlus, FiX } from "react-icons/fi";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import { ToastProvider } from "@/providers/ToastProvider";

function NavLink({ href, children, onClick }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${active ? "bg-[#1f6b4f]/10 text-[#164b39]" : "text-[#647067] hover:bg-[#1f6b4f]/10 hover:text-[#164b39]"}`}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMenuOpen(false);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    closeMenu();
    await logout();
  };

  return (
    <header className="sticky top-0 z-20 border-b border-[#ded6c7]/80 bg-[#f7f3ea]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-extrabold text-[#1f2520]" onClick={closeMenu}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#1f6b4f] text-sm font-bold text-white">QH</span>
          <span className="text-lg">QurbaniHat</span>
        </Link>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1f6b4f] text-xl text-white sm:hidden"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          <NavLink href="/" onClick={closeMenu}>Home</NavLink>
          <NavLink href="/animals" onClick={closeMenu}>All Animals</NavLink>
          {user && <NavLink href="/my-profile" onClick={closeMenu}>My Profile</NavLink>}
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          {user ? (
            <>
              <img className="h-10 w-10 rounded-full border-2 border-white object-cover" src={user.image || "/images/avatar-placeholder.png"} alt={user.name} />
              <button className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#ded6c7] bg-[#fffdf7]/80 px-4 py-2 font-semibold text-[#1f2520] transition hover:-translate-y-0.5" onClick={handleLogout}>
                <FiLogOut aria-hidden="true" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#ded6c7] bg-[#fffdf7]/80 px-4 py-2 font-semibold text-[#1f2520] transition hover:-translate-y-0.5" href="/login" onClick={closeMenu}>
                <FiLogIn aria-hidden="true" />
                Login
              </Link>
              <Link className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#1f6b4f] px-4 py-2 font-semibold text-white transition hover:-translate-y-0.5" href="/register" onClick={closeMenu}>
                <FiUserPlus aria-hidden="true" />
                Register
              </Link>
            </>
          )}
        </div>

        <div id="mobile-nav-menu" className={`w-full border-t border-[#ded6c7] pt-3 sm:hidden ${menuOpen ? "flex flex-col gap-3" : "hidden"}`}>
          <div className="flex flex-col gap-1">
            <NavLink href="/" onClick={closeMenu}>Home</NavLink>
            <NavLink href="/animals" onClick={closeMenu}>All Animals</NavLink>
            {user && <NavLink href="/my-profile" onClick={closeMenu}>My Profile</NavLink>}
          </div>
          <div className="flex flex-col gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-3 rounded-lg bg-[#fffdf7]/80 p-2">
                  <img className="h-10 w-10 rounded-full border-2 border-white object-cover" src={user.image || "/images/avatar-placeholder.png"} alt={user.name} />
                  <div>
                    <p className="font-semibold text-[#1f2520]">{user.name}</p>
                    <p className="text-sm text-[#647067]">{user.email}</p>
                  </div>
                </div>
                <button className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#ded6c7] bg-[#fffdf7]/80 px-4 py-2 font-semibold text-[#1f2520] transition" onClick={handleLogout}>
                  <FiLogOut aria-hidden="true" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#ded6c7] bg-[#fffdf7]/80 px-4 py-2 font-semibold text-[#1f2520] transition" href="/login" onClick={closeMenu}>
                  <FiLogIn aria-hidden="true" />
                  Login
                </Link>
                <Link className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#1f6b4f] px-4 py-2 font-semibold text-white transition" href="/register" onClick={closeMenu}>
                  <FiUserPlus aria-hidden="true" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

      </nav>
    </header>
  );
}

export default function AppShell({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </ToastProvider>
    </AuthProvider>
  );
}


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import { ToastProvider } from "@/providers/ToastProvider";

function NavLink({ href, children }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link className={active ? "nav-link nav-link-active" : "nav-link"} href={href}>
      {children}
    </Link>
  );
}

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="site-header">
      <nav className="nav-wrap">
        <Link href="/" className="brand">
          <span className="brand-mark">QH</span>
          <span>QurbaniHat</span>
        </Link>
        <div className="nav-links">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/animals">All Animals</NavLink>
          {user && <NavLink href="/my-profile">My Profile</NavLink>}
        </div>
        <div className="nav-actions">
          {user ? (
            <>
              <img className="avatar" src={user.image || "/images/avatar-placeholder.png"} alt={user.name} />
              <button className="ghost-button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="ghost-button" href="/login">
                Login
              </Link>
              <Link className="primary-button compact" href="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>QurbaniHat</h3>
        <p>A Bangladesh haat-bazar booking experience for verified Qurbani cows and goats.</p>
      </div>
      <div>
        <h4>Contact</h4>
        <p>Hotline: +880 1711-000000</p>
        <p>Email: care@qurbanihat.example</p>
      </div>
      <div>
        <h4>Social</h4>
        <p>Facebook / Instagram / YouTube</p>
        <p>Farm updates every evening.</p>
      </div>
    </footer>
  );
}

export default function AppShell({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <Navbar />
        <main className="page-body">{children}</main>
        <Footer />
      </ToastProvider>
    </AuthProvider>
  );
}

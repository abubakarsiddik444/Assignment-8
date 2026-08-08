"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import { ToastProvider } from "@/providers/ToastProvider";

function NavLink({ href, children, onClick }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link className={active ? "nav-link nav-link-active" : "nav-link"} href={href} onClick={onClick}>
      {children}
    </Link>
  );
}

function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    closeMenu();
    await logout();
  };

  return (
    <header className="site-header">
      <nav className="nav-wrap">
        <Link href="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark">QH</span>
          <span>QurbaniHat</span>
        </Link>

        <button
          className="mobile-menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          aria-label="Toggle navigation menu"
        >
          ⋮
        </button>

        <div className="nav-links desktop-nav">
          <NavLink href="/" onClick={closeMenu}>Home</NavLink>
          <NavLink href="/animals" onClick={closeMenu}>All Animals</NavLink>
          {user && <NavLink href="/my-profile" onClick={closeMenu}>My Profile</NavLink>}
        </div>
        <div className="nav-actions desktop-nav">
          {user ? (
            <>
              <img className="avatar" src={user.image || "/images/avatar-placeholder.png"} alt={user.name} />
              <button className="ghost-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="ghost-button" href="/login" onClick={closeMenu}>
                Login
              </Link>
              <Link className="primary-button compact" href="/register" onClick={closeMenu}>
                Register
              </Link>
            </>
          )}
        </div>

        <div id="mobile-nav-menu" className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <div className="mobile-menu-links">
            <NavLink href="/" onClick={closeMenu}>Home</NavLink>
            <NavLink href="/animals" onClick={closeMenu}>All Animals</NavLink>
            {user && <NavLink href="/my-profile" onClick={closeMenu}>My Profile</NavLink>}
          </div>
          <div className="mobile-menu-actions">
            {user ? (
              <>
                <div className="mobile-profile">
                  <img className="avatar" src={user.image || "/images/avatar-placeholder.png"} alt={user.name} />
                  <div>
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                </div>
                <button className="ghost-button" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="ghost-button" href="/login" onClick={closeMenu}>
                  Login
                </Link>
                <Link className="primary-button compact" href="/register" onClick={closeMenu}>
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

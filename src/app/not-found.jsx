import Link from "next/link";

export default function NotFound() {
  return (
    <section className="auth-wall">
      <span className="eyebrow">404</span>
      <h1>Page not found</h1>
      <p>The route you requested is not available in QurbaniHat.</p>
      <Link className="primary-button" href="/">
        Return Home
      </Link>
    </section>
  );
}

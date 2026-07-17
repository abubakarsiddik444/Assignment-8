import "./globals.css";
import "animate.css";
import AppShell from "@/components/shared/AppShell";

export const metadata = {
  title: "QurbaniHat - Livestock Booking Platform",
  description: "A modern marketplace for booking Qurbani cows and goats.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

import dns from "node:dns";
// dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setServers(["1.1.1.1", "1.0.0.1"]);


import "./globals.css";
import "animate.css";
import AppShell from "@/components/shared/AppShell";

export const metadata = {
  title: "QurbaniHat - Livestock Booking Platform",
  description: "A modern marketplace for booking Qurbani cows and goats.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <AppShell>{children}</AppShell>
        
      </body>
    </html>
  );
}

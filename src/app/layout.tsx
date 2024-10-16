'use client'
import "./globals.css";
import Header from "./Components/header";
import Sidebar from "./Components/sidebar";
import Site from "./Components/dropdownSite";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Import usePathname from Next.js

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState(""); // Default active page
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    // Update activePage based on the current pathname
    switch (pathname) {
      case "/realtime":
        setActivePage("Realtime");
        break;
      case "/riwayat":
        setActivePage("Riwayat");
        break;
      case "/area":
        setActivePage("Area");
        break;
      case "/area/tambah-area":
        setActivePage("Area");
        break;
      case "/sensor":
        setActivePage("Sensor");
        break;
      case "/profil":
        setActivePage("Profil");
        break;
      default:
        setActivePage("Dashboard"); // Fallback to "Dashboard"
    }
  }, [pathname]); // Run effect when pathname changes

  return (
    <html lang="en">
      <body className="font-roboto">
        <div className="flex">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} activePage={activePage} setActivePage={setActivePage} />

          <div className={`${sidebarOpen ? "ml-72" : "ml-20"} flex-grow transition-all duration-300`}>
            <Header title={activePage} />
            {/* <Site /> */}
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

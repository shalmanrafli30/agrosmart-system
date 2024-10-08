'use client'  // Menandakan komponen ini harus dirender di client

import "./globals.css";
import Header from "./Components/header";
import Sidebar from "./Components/sidebar";
import Site from "./Components/dropdownSite";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Mengatur state untuk sidebar open/close
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard"); // Track active page

  return (
    <html lang="en">
      <body className="font-roboto">
        <div className="flex">
          {/* Sidebar menerima prop untuk state open/close dan active page */}
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} activePage={activePage} setActivePage={setActivePage} />

          <div className={`${sidebarOpen ? "ml-72" : "ml-20"} flex-grow transition-all duration-300`}>
            {/* Header dan dropdown */}
            <Header title="Dashboard" />
            <Site />

            {/* Konten anak-anak */}
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

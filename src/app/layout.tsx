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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <html lang="en">
      <body className="font-roboto">
        <div className="flex">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} activePage={activePage} setActivePage={setActivePage} />

          <div className={`${sidebarOpen ? "ml-72" : "ml-20"} flex-grow transition-all duration-300`}>
            <Header title="Dashboard" />
            <Site />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

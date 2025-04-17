// // src/app/RootLayout.tsx
// 'use client'
// import "./globals.css";
// import Header from "./Components/header";
// import Sidebar from "./Components/sidebar";
// import Site from "./Components/dropdownSite";
// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation"; // Import usePathname from Next.js

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activePage, setActivePage] = useState(""); // Default active page
//   const pathname = usePathname(); // Get the current pathname

//   useEffect(() => {
//     // Update activePage based on the current pathname
//     switch (true) {
//       case pathname === "/realtime":
//         setActivePage("Realtime");
//         break;
//       case pathname === "/riwayat":
//         setActivePage("Riwayat");
//         break;
//       case pathname === "/plant":
//       case pathname === "/plant/tambah-plant":
//       case pathname === "/plant/edit-plant":
//         setActivePage("Tanaman");
//         break;
//       case pathname === "/sensor":
//       case pathname === "/sensor/tambah-sensor":
//       case pathname?.startsWith("/sensor/edit-sensor"):
//         setActivePage("Sensor");
//         break;
//       case pathname === "/profil":
//         setActivePage("Profil");
//         break;
//       default:
//         setActivePage("Dashboard"); // Fallback to "Dashboard"
//     }
//   }, [pathname]); // Run effect when pathname changes
  

//   return (
//     <html lang="en">
//       <body className="font-roboto">
//         <div className="flex">
//           <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} activePage={activePage} setActivePage={setActivePage} />
//           <div className={`${sidebarOpen ? "ml-72" : "ml-20"} flex-grow transition-all duration-300`}>
//             {/* <Header title={activePage} /> */}
//             {/* <Site /> */}
//             {children}
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }


'use client'

import "./globals.css";
import Header from "./Components/header";
import Sidebar from "./Components/sidebar";
import Site from "./Components/dropdownSite";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    switch (true) {
      case pathname === "/realtime":
        setActivePage("Realtime");
        break;
      case pathname === "/riwayat":
        setActivePage("Riwayat");
        break;
      case pathname === "/plant":
      case pathname === "/plant/tambah-plant":
      case pathname === "/plant/edit-plant":
        setActivePage("Tanaman");
        break;
      case pathname === "/sensor":
      case pathname === "/sensor/tambah-sensor":
      case pathname?.startsWith("/sensor/edit-sensor"):
        setActivePage("Sensor");
        break;
      case pathname === "/profil":
        setActivePage("Profil");
        break;
      default:
        setActivePage("Dashboard");
    }
  }, [pathname]);

  // Kalau halaman login, tampilkan halaman kosong tanpa layout
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body className="font-roboto">
        {isLoginPage ? (
          // Layout khusus halaman login (tanpa sidebar, header, dll)
          children
        ) : (
          <div className="flex">
            <Sidebar
              open={sidebarOpen}
              setOpen={setSidebarOpen}
              activePage={activePage}
              setActivePage={setActivePage}
            />
            <div className={`${sidebarOpen ? "ml-72" : "ml-20"} flex-grow transition-all duration-300`}>
              {/* <Header title={activePage} /> */}
              {/* <Site /> */}
              {children}
            </div>
          </div>
        )}
      </body>
    </html>
  );
}

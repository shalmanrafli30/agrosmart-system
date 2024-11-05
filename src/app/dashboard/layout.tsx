// src/app/layout.tsx
import { Metadata } from "next";
import RootLayout from "../layout"; // Import your client layout

// Export metadata from here
export const metadata: Metadata = {
  title: "Dashboard",
  description: "AgroSmartSystem Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>; // Use the client component here
}

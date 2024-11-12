// src/app/layout.tsx
import { Metadata } from "next";
import RootLayout from "../RootLayout"; // Import your client layout
import Header from "../Components/header";

// Export metadata from here
export const metadata: Metadata = {
  title: "Riwayat",
  description: "AgroSmartSystem Riwayat",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>
      <Header title={'Riwayat'}/>
      {children}
    </RootLayout>; // Use the client component here
}

// src/app/layout.tsx
import { Metadata } from "next";
import RootLayout from "../RootLayout"; // Import your client layout
import Header from "../Components/header";

// Export metadata from here
export const metadata: Metadata = {
  title: "Tanaman",
  description: "AgroSmartSystem Area",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>
    <Header title={'Tanaman'}/>
      {children}
    </RootLayout>; // Use the client component here
}

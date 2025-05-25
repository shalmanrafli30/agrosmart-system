import { Metadata } from "next";
import RootLayout from "../RootLayout";
import Header from "../Components/header";

export const metadata: Metadata = {
  title: "Chatbot",
  description: "AgroSmartSystem Chatbot",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout>
      <div className="sticky top-0 z-20 bg-white shadow">
        <Header title={'Chatbot'} />
      </div>
      {children}
    </RootLayout>
  );
}
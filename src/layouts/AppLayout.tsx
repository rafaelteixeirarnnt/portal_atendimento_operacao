import { Outlet } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useLocalPreferences } from "@/hooks/useLocalPreferences";

export const AppLayout = () => {
  const preferences = useLocalPreferences();

  return (
    <div className="min-h-screen bg-background">
      <Header preferences={preferences} />
      <main className="container py-10 md:py-14">
        <Outlet context={preferences} />
      </main>
      <Footer />
    </div>
  );
};

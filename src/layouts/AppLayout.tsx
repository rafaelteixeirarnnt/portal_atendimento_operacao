import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StateSelectionModal } from "@/components/StateSelectionModal";
import { useLocalPreferences } from "@/hooks/useLocalPreferences";

export const AppLayout = () => {
  const navigate = useNavigate();
  const preferences = useLocalPreferences();
  const [isStateSelectorOpen, setIsStateSelectorOpen] = useState(false);
  const selectedState = preferences.preferences.selectedState;
  const shouldShowStateSelector = isStateSelectorOpen || !selectedState;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header preferences={preferences} onOpenStateSelector={() => setIsStateSelectorOpen(true)} />
      <main className="container flex-1 py-10 md:py-14">
        <Outlet context={preferences} />
      </main>
      <Footer />
      <StateSelectionModal
        open={shouldShowStateSelector}
        selectedState={selectedState}
        onOpenChange={(open) => {
          if (selectedState) {
            setIsStateSelectorOpen(open);
          }
        }}
        onSelectState={(state) => {
          preferences.updateSelectedState(state);
          setIsStateSelectorOpen(false);
          navigate("/");
        }}
      />
    </div>
  );
};

"use client";

import { signOut } from "next-auth/react";
import { useHotkeys } from "react-hotkeys-hook";
import { useState } from "react";
import MobileNavbar from "@/components/ui/mobile-navbar";
import Footer from "@/components/ui/footer";
import Frame from "@/components/ui/frame";

export default function Dashboard() {
  const handleLogoutClick = async () => {
    await signOut();
  };

  const [language, setLanguage] = useState<"pt-br" | "en" | "es">("pt-br");
  const [openPreferences, setOpenPreferences] = useState(false);
  const [page, setPage] = useState<
    "main" | "library" | "profile" | "billing" | "settings" | "search"
  >("main");

  useHotkeys("shift+p", () => {
    alert("Perfil");
  });

  useHotkeys("shift+b", () => {
    alert("Cobrança");
  });

  useHotkeys("shift+s", () => {
    alert("Configurações");
  });

  useHotkeys("shift+k", () => {
    setOpenPreferences(true);
  });

  useHotkeys("shift+q", () => {
    handleLogoutClick();
  });

  useHotkeys("s", () => {
    alert("Buscar");
  });

  return (
    <div className="w-full flex-col flex h-screen overflow-y-hidden bg-[#131619]">
      <Frame
        handleLogoutClick={handleLogoutClick}
        language={language}
        setLanguage={setLanguage}
        openPreferences={openPreferences}
        setOpenPreferences={setOpenPreferences}
        page={page}
      />

      <Footer />
      <MobileNavbar language={language} setPage={setPage} />
    </div>
  );
}

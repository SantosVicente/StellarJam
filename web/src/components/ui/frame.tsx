"use client";

import { useState } from "react";
import Footer from "./footer";
import Header from "./header";
import LateralMenu from "./lateral-menu";
import Search, { Track } from "./search";
import MobileNavbar from "./mobile-navbar";

interface FrameProps {
  language: "pt-br" | "en" | "es";
  setLanguage: (language: "pt-br" | "en" | "es") => void;
  openPreferences: boolean;
  setOpenPreferences: (open: boolean) => void;
  handleLogoutClick: () => void;
  page: "main" | "library" | "profile" | "billing" | "settings" | "search";
  setPage: (
    page: "main" | "library" | "profile" | "billing" | "settings" | "search"
  ) => void;
}

const Frame = ({
  language,
  setLanguage,
  openPreferences,
  setOpenPreferences,
  handleLogoutClick,
  page,
  setPage,
}: FrameProps) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  return (
    <>
      <div className="flex w-full h-[80%] lg:h-[90%]">
        <LateralMenu language={language} setPage={setPage} />
        <div className="w-full h-full">
          <Header
            language={language}
            setLanguage={setLanguage}
            openPreferences={openPreferences}
            setOpenPreferences={setOpenPreferences}
            handleLogoutClick={handleLogoutClick}
          />

          {
            {
              main: <p>Main</p>,
              library: <p>Library</p>,
              profile: <p>Profile</p>,
              billing: <p>Billing</p>,
              settings: <p>Settings</p>,
              search: (
                <Search language={language} setCurrentTrack={setCurrentTrack} />
              ),
            }[page]
          }
        </div>
      </div>
      <div className="fixed bottom-0 w-full">
        <Footer setCurrentTrack={setCurrentTrack} currentTrack={currentTrack} />
        <MobileNavbar language={language} setPage={setPage} />
      </div>
    </>
  );
};

export default Frame;

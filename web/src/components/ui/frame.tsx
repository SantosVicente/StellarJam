"use client";

import Header from "./header";
import LateralMenu from "./lateral-menu";
import Main from "@/app/(user-routes)/dashboard/main/page";

interface FrameProps {
  language: "pt-br" | "en" | "es";
  setLanguage: (language: "pt-br" | "en" | "es") => void;
  openPreferences: boolean;
  setOpenPreferences: (open: boolean) => void;
  handleLogoutClick: () => void;
  page: "main" | "library" | "profile" | "billing" | "settings" | "search";
}

const Frame = ({
  language,
  setLanguage,
  openPreferences,
  setOpenPreferences,
  handleLogoutClick,
  page,
}: FrameProps) => {
  return (
    <div className="flex w-full h-full">
      <LateralMenu language={language} />
      <div className="w-full relative">
        <Header
          language={language}
          setLanguage={setLanguage}
          openPreferences={openPreferences}
          setOpenPreferences={setOpenPreferences}
          handleLogoutClick={handleLogoutClick}
        />

        {
          {
            main: <Main language={language} />,
            library: <p>Library</p>,
            profile: <p>Profile</p>,
            billing: <p>Billing</p>,
            settings: <p>Settings</p>,
            search: <p>Search</p>,
          }[page]
        }
      </div>
    </div>
  );
};

export default Frame;

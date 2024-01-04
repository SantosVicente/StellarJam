import { Home, Library, Search } from "lucide-react";
import React, { useState } from "react";

interface MobileNavbarProps {
  language: "pt-br" | "en" | "es";
  setPage: (
    page: "main" | "library" | "profile" | "billing" | "settings" | "search"
  ) => void;
}

const MobileNavbar = ({ language, setPage }: MobileNavbarProps) => {
  const [activeList, setActiveList] = useState<
    "main" | "library" | "profile" | "billing" | "settings" | "search"
  >("main");

  const handleItemClick = (
    page: "main" | "library" | "profile" | "billing" | "settings" | "search"
  ) => {
    setActiveList(page);
    setPage(page);
  };

  return (
    <div className="navigation bg-zinc-950 md:hidden">
      <ul>
        <li className={`list ${activeList === "main" ? "active" : ""}`}>
          <a href="#" onClick={() => handleItemClick("main")}>
            <span className="icon">
              <Home size={24} />
            </span>
            <span className="text">
              {
                {
                  "pt-br": "Início",
                  en: "Home",
                  es: "Inicio",
                }[language]
              }
            </span>
          </a>
        </li>
        <li className={`list ${activeList === "search" ? "active" : ""}`}>
          <a href="#" onClick={() => handleItemClick("search")}>
            <span className="icon">
              <Search size={24} />
            </span>
            <span className="text">
              {
                {
                  "pt-br": "Buscar",
                  en: "Search",
                  es: "Buscar",
                }[language]
              }
            </span>
          </a>
        </li>
        <li className={`list ${activeList === "library" ? "active" : ""}`}>
          <a href="#" onClick={() => handleItemClick("library")}>
            <span className="icon">
              <Library size={24} />
            </span>
            <span className="text">
              {
                {
                  "pt-br": "Biblioteca",
                  en: "Library",
                  es: "Biblioteca",
                }[language]
              }
            </span>
          </a>
        </li>
        <div className="indicator"></div>
      </ul>
    </div>
  );
};

export default MobileNavbar;

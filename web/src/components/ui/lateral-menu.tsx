import Image from "next/image";
import { Separator } from "./separator";
import Logo from "../../app/assets/Logo.svg";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, Search, Star } from "lucide-react";

interface LateralMenuProps {
  language: "pt-br" | "en" | "es";
}

const LateralMenu = ({ language }: LateralMenuProps) => {
  return (
    <div className="lg:flex hidden bg-zinc-950 flex-col m-2 mb-0 w-96 rounded-lg">
      <div className="flex gap-2 items-center justify-center my-4">
        <Image
          src={Logo}
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          className="object-cover w-10 h-10"
        />
        <div className="hidden md:block">
          <h1 className="text-3xl font-bold gradient-logo">StellarJam</h1>
        </div>
      </div>

      <Separator />

      <div className="py-5 flex flex-col gap-4">
        <p className="pl-8 text-zinc-400 font-bold uppercase text-xs">
          {
            {
              "pt-br": "Ações",
              en: "Actions",
              es: "Acciones",
            }[language]
          }
        </p>

        <Button className="flex justify-between mx-3 bg-transparent hover:bg-[#212526] hover:bg-opacity-65 transition-colors">
          <div className="flex gap-2">
            <Home size={20} />
            <p className="ml-2">
              {
                {
                  "pt-br": "Início",
                  en: "Home",
                  es: "Inicio",
                }[language]
              }
            </p>
          </div>
        </Button>

        <Button className="flex justify-between mx-3 bg-transparent hover:bg-[#212526] hover:bg-opacity-65 transition-colors">
          <div className="flex gap-2">
            <Search size={20} />
            <p className="ml-2">
              {
                {
                  "pt-br": "Buscar",
                  en: "Search",
                  es: "Buscar",
                }[language]
              }
            </p>
          </div>
          <p className="p-1 border border-zinc-800 rounded-lg">⌘S</p>
        </Button>
      </div>

      <Separator />

      <div className="py-5 flex flex-col gap-4">
        <p className="pl-8 text-zinc-400 font-bold uppercase text-xs">
          {
            {
              "pt-br": "Biblioteca",
              en: "Library",
              es: "Biblioteca",
            }[language]
          }
        </p>

        <Button
          //deve abrir uma página com as músicas favoritas do usuário
          className="flex justify-between mx-3 bg-transparent hover:bg-[#212526] hover:bg-opacity-65 transition-colors"
        >
          <div className="flex gap-2">
            <Star size={20} className="text-yellow-300" />
            <p className="ml-2">
              {
                {
                  "pt-br": "Favoritos",
                  en: "Favorites",
                  es: "Favoritos",
                }[language]
              }
            </p>
          </div>
        </Button>

        {/*
            <Button
            //deve abrir uma página com a playlist favoritada do usuário
            //o usuario pode favoritar uma playlist, mas não pode criar uma
            className="flex justify-between mx-3 bg-transparent hover:bg-[#212526] hover:bg-opacity-65 transition-colors">
              <div className="flex gap-2">
                <Layers size={20} />
                <p className="ml-2">
                  {
                    //imprimir as playlists do usuário
                  }
                </p>
              </div>
            </Button>
            */}

        <Button
          disabled
          className="flex justify-between text-zinc-200 mx-3 bg-transparent transition-colors"
        >
          <div className="flex gap-2 ">
            <PlusCircle size={20} />
            <p className="ml-2">
              {
                {
                  "pt-br": "Criar Playlist",
                  en: "Create Playlist",
                  es: "Crear Playlist",
                }[language]
              }
            </p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default LateralMenu;

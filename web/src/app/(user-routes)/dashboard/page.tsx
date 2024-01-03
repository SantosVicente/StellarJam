"use client";

import Image from "next/image";
import Logo from "../../assets/Logo.svg";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useHotkeys } from "react-hotkeys-hook";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Home,
  Layers,
  ListMusic,
  Maximize2,
  Menu,
  Mic2,
  MonitorSpeaker,
  PlayCircle,
  PlusCircle,
  Repeat,
  Search,
  Shuffle,
  SkipBack,
  SkipForward,
  Star,
  Volume2,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function Dashboard() {
  const { status, data } = useSession();

  const handleLogoutClick = async () => {
    await signOut();
  };

  const [language, setLanguage] = useState<"pt-br" | "en" | "es">("pt-br");
  const [openPreferences, setOpenPreferences] = useState(false);

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
    <div className="w-full flex-col flex h-screen bg-[#131619]">
      <div className="flex w-full h-full">
        <div className="lg:flex hidden bg-zinc-950 flex-col m-2 w-96 rounded-lg">
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
              className="flex justify-between text-zinc-600 hover:text-zinc-200 mx-3 bg-transparent hover:bg-[#212526] hover:bg-opacity-65 transition-colors"
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

        <div className="w-full">
          <header className="flex items-center w-full justify-between px-4 sm:px-8">
            <div>
              <Image
                src={Logo}
                alt="logo"
                width={0}
                height={0}
                sizes="100vw"
                className="lg:hidden object-cover w-10 h-10"
              />
            </div>

            {status === "authenticated" && data?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex flex-col cursor-pointer transform hover:scale-105 transition-transform">
                    <div className="flex items-center gap-2 py-4 text-zinc-400 hover:text-zinc-100 transition-all">
                      <Avatar>
                        <AvatarFallback>
                          {data.user.name?.[0].toUpperCase()}
                        </AvatarFallback>

                        {data.user.image && (
                          <AvatarImage src={data.user.image} />
                        )}
                      </Avatar>

                      <div className="flex flex-col">
                        <p className="font-medium">{data.user.name}</p>
                        <p className="text-sm">
                          {
                            {
                              "pt-br": "Bem Vindo!",
                              en: "Welcome!",
                              es: "Bienvenido!",
                            }[language]
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="lg:m-0 mx-3 w-56 bg-zinc-950">
                  <DropdownMenuLabel>
                    {
                      {
                        "pt-br": "Minha Conta",
                        en: "My Account",
                        es: "Mi Cuenta",
                      }[language]
                    }
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                      {
                        {
                          "pt-br": "Perfil",
                          en: "Profile",
                          es: "Perfil",
                        }[language]
                      }
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      {
                        {
                          "pt-br": "Cobrança",
                          en: "Billing",
                          es: "Cobranza",
                        }[language]
                      }
                      <DropdownMenuShortcut>⇧⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      {
                        {
                          "pt-br": "Configurações",
                          en: "Settings",
                          es: "Configuraciones",
                        }[language]
                      }
                      <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => setOpenPreferences(true)}
                    >
                      {
                        {
                          "pt-br": "Preferências",
                          en: "Preferences",
                          es: "Preferencias",
                        }[language]
                      }

                      <DropdownMenuShortcut>⇧⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <Link
                    href="https://github.com/SantosVicente/StellarJam"
                    target="_blank"
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      GitHub
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer">
                    {
                      {
                        "pt-br": "Ajuda",
                        en: "Help",
                        es: "Ayuda",
                      }[language]
                    }
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogoutClick}
                  >
                    {
                      {
                        "pt-br": "Sair",
                        en: "Logout",
                        es: "Salir",
                      }[language]
                    }
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4 mt-5">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2 w-20" />
                </div>
              </div>
            )}

            <Sheet
              open={openPreferences}
              onOpenChange={() => setOpenPreferences(false)}
            >
              <SheetContent className="">
                <SheetHeader>
                  <SheetTitle>
                    {
                      {
                        "pt-br": "Preferências",
                        en: "Preferences",
                        es: "Preferencias",
                      }[language]
                    }
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 mt-5">
                  <div className="flex gap-2 flex-col">
                    <p className="text-zinc-400">
                      {
                        {
                          "pt-br": "Idioma",
                          en: "Language",
                          es: "Idioma",
                        }[language]
                      }
                    </p>
                    <Select
                      onValueChange={(value) => {
                        setLanguage(value as "pt-br" | "en" | "es");
                      }}
                      defaultValue={language}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder={
                            {
                              "pt-br": "Selecione um idioma",
                              en: "Select a language",
                              es: "Seleccione un idioma",
                            }[language]
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="pt-br">Português</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-zinc-400">
                      {
                        {
                          "pt-br": "Tema",
                          en: "Theme",
                          es: "Tema",
                        }[language]
                      }
                    </p>

                    <Select
                      onValueChange={(value) => {
                        alert("Ainda não implementado");
                      }}
                      defaultValue={"dark"}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder={
                            {
                              "pt-br": "Selecione um tema",
                              en: "Select a theme",
                              es: "Seleccione un tema",
                            }[language]
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="white">
                            {
                              {
                                "pt-br": "Claro",
                                en: "Light",
                                es: "Claro",
                              }[language]
                            }
                          </SelectItem>
                          <SelectItem value="dark">
                            {
                              {
                                "pt-br": "Escuro",
                                en: "Dark",
                                es: "Oscuro",
                              }[language]
                            }
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </header>
        </div>
      </div>
      <footer className="bg-footer bg-gradient-to-tl from-[#0f1011] to-[#0c0d0e] rounded-lg m-2 mt-0">
        <div className="mx-6 flex justify-between items-center h-20">
          <div className="flex gap-4 items-center justify-between w-full lg:w-auto">
            <div className="flex gap-4 items-center">
              <Image
                src="/placehold.jpg"
                alt=""
                width={60}
                height={60}
                className="rounded-md"
              />
              <div>
                <p className="text-zinc-300 text-sm">Music Name</p>
                <p className="text-zinc-400 text-xs">Artist</p>
              </div>
            </div>

            <div className="flex gap-2  justify-end">
              <div
                //deve adicionar a música na playlist de favoritos do usuário
                className="bg-transparent hover:bg-transparent text-zinc-500 cursor-pointer hover:text-zinc-300 transition-all"
              >
                <PlusCircle size={25} />
              </div>

              <div
                //deve adicionar a música na playlist de favoritos do usuário
                className="md:hidden bg-transparent hover:bg-transparent cursor-pointer text-zinc-500 hover:text-zinc-300 transition-all"
              >
                <PlayCircle size={25} />
              </div>
            </div>
          </div>

          <div className="hidden flex-col items-center gap-2 md:flex ml-11">
            <div className="flex items-center gap-6">
              <button>
                <Shuffle size={20} className="text-zinc-400 hover:text-white" />
              </button>
              <button>
                <SkipBack
                  size={20}
                  className="text-zinc-400 hover:text-white"
                />
              </button>
              <button className="">
                <PlayCircle
                  size={35}
                  className="text-zinc-400 hover:text-white"
                />
              </button>
              <button>
                <SkipForward
                  size={20}
                  className="text-zinc-400 hover:text-white"
                />
              </button>
              <button>
                <Repeat size={20} className="text-zinc-400 hover:text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">0:31</span>
              <Slider
                max={251} //deve ser o tempo total da música
                min={0} //deve ser o tempo atual da música
                defaultValue={[31]}
                className="rounded-full w-[40rem] bg-zinc-600"
              />
              <span className="text-xs text-zinc-400">2:51</span>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button className="text-zinc-400 hover:text-white transition-colors">
              <Mic2 size={16} />
            </button>
            <button className="text-zinc-400 hover:text-white transition-colors">
              <ListMusic size={20} />
            </button>
            <button className="text-zinc-400 hover:text-white transition-colors">
              <MonitorSpeaker size={20} />
            </button>
            <div className="flex gap-2 items-center">
              <button className="text-zinc-400 hover:text-white transition-colors">
                <Volume2 size={20} />
              </button>
              <Slider
                max={1}
                min={0.1}
                defaultValue={[0.5]}
                step={0.1}
                className="transform scale-75 rounded-full w-32 -mx-4 bg-zinc-600"
              />
            </div>
            <button className="text-zinc-400 hover:text-white transition-colors">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

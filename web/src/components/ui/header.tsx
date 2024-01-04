import Image from "next/image";
import Logo from "../../app/assets/Logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Home from "@/app/(user-routes)/dashboard/home/page";

interface HeaderProps {
  language: "pt-br" | "en" | "es";
  setLanguage: (language: "pt-br" | "en" | "es") => void;
  openPreferences: boolean;
  setOpenPreferences: (open: boolean) => void;
  handleLogoutClick: () => void;
}

const Header = ({
  language,
  setLanguage,
  setOpenPreferences,
  openPreferences,
  handleLogoutClick,
}: HeaderProps) => {
  const { status, data } = useSession();

  return (
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

                  {data.user.image && <AvatarImage src={data.user.image} />}
                </Avatar>

                <div className="hidden md:flex flex-col">
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
          <div className="space-y-2 hidden md:block">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-2 w-20" />
          </div>
        </div>
      )}

      <Sheet
        open={openPreferences}
        onOpenChange={() => setOpenPreferences(false)}
      >
        <SheetContent className="bg-zinc-950">
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
                <SelectTrigger className="w-[180px] bg-zinc-900">
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
                <SelectContent className="bg-zinc-900">
                  <SelectGroup>
                    <SelectItem value="pt-br" className="bg-zinc-900">
                      Português
                    </SelectItem>
                    <SelectItem value="en" className="bg-zinc-900">
                      English
                    </SelectItem>
                    <SelectItem value="es" className="bg-zinc-900">
                      Español
                    </SelectItem>
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
                <SelectTrigger className="w-[180px] bg-zinc-900">
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
                <SelectContent className="bg-zinc-900">
                  <SelectGroup>
                    <SelectItem value="white" className="bg-zinc-900">
                      {
                        {
                          "pt-br": "Claro",
                          en: "Light",
                          es: "Claro",
                        }[language]
                      }
                    </SelectItem>
                    <SelectItem value="dark" className="bg-zinc-900">
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
  );
};

export default Header;

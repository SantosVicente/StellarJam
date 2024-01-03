"use client";

import Image from "next/image";
import Logo from "../../assets/Logo.svg";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function Dashboard() {
  const { status, data } = useSession();

  const handleLogoutClick = async () => {
    await signOut();
  };

  const [language, setLanguage] = useState<"pt-br" | "en" | "es">("pt-br");

  return (
    <div className="w-full block md:flex">
      <div className="flex flex-col w-full min-h-screen p-4 sm:p-8 2xl:px-20">
        <header className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
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
              <DropdownMenuContent className="w-56">
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
                  <DropdownMenuItem>
                    {
                      {
                        "pt-br": "Perfil",
                        en: "Profile",
                        es: "Perfil",
                      }[language]
                    }
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {
                      {
                        "pt-br": "Cobrança",
                        en: "Billing",
                        es: "Cobranza",
                      }[language]
                    }
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {
                      {
                        "pt-br": "Configurações",
                        en: "Settings",
                        es: "Configuraciones",
                      }[language]
                    }
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {
                      {
                        "pt-br": "Preferências",
                        en: "Preferences",
                        es: "Preferencias",
                      }[language]
                    }
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogoutClick}>
                  Log out
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
        </header>
      </div>
    </div>
  );
}

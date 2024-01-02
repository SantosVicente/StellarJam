"use client";

import Image from "next/image";
import Logo from "../assets/Logo.svg";
import Background from "../assets/abstract-01.png";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { status, data } = useSession();

  const handleLogoutClick = async () => {
    await signOut();
  };

  if (status === "unauthenticated") {
    redirect("/");
  }

  return (
    <div className="w-full block md:flex">
      <div className="flex flex-col md:w-1/2 min-h-screen p-4 sm:p-8 2xl:px-20">
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

          {status === "authenticated" && data?.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-4">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>

                  {data.user.image && <AvatarImage src={data.user.image} />}
                </Avatar>

                <div className="flex flex-col">
                  <p className="font-medium">{data.user.name}</p>
                  <p
                    className="text-sm opacity-75 cursor-pointer text-zinc-400 hover:text-zinc-100 transition-all"
                    onClick={handleLogoutClick}
                  >
                    Clique para sair
                  </p>
                </div>
              </div>
            </div>
          )}
        </header>

        <div className="flex-1 flex items-center w-full transform scale-90 sm:scale-100 2xl:px-36 xl:px-24 lg:px-14 md:px-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl">
              Se jogue e dê o{" "}
              <span className="gradient-text font-bold">play!</span>
            </h1>
            <h2 className="text-sm text-zinc-400 font-medium">
              VOCÊ ESTÁ LOGADO NO STELLARJAM
            </h2>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-0 hidden md:block">
        <Image
          src={Background}
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          className="object-cover w-full h-screen rounded-l-[3rem]"
        />
      </div>
    </div>
  );
}

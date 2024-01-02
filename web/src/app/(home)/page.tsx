"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import Logo from "../assets/Logo.svg";
import Google from "../assets/Google.svg";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { LockKeyhole, Mail, Github } from "lucide-react";
import Background from "../assets/abstract-01.png";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const { toast } = useToast();
  const router = useRouter();

  const { status, data } = useSession();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleLoginGoogleClick = async () => {
    await signIn("google", {
      callbackUrl: "/dashboard",
    });
  };

  const handleLoginGithubClick = async () => {
    await signIn("github", {
      callbackUrl: "/dashboard",
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (res?.error) {
      toast({
        title: "Erro",
        description: `${res.error} - Status ${res.status}`,
      });
      return;
    }

    router.replace("/dashboard");
  };

  if (status === "authenticated") {
    redirect("/dashboard");
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

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
        </header>

        <div className="flex-1 flex items-center w-full transform scale-90 sm:scale-100 2xl:px-36 xl:px-24 lg:px-14 md:px-10">
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl">
                Se jogue e dê o{" "}
                <span className="gradient-text font-bold">play!</span>
              </h1>
              <h2 className="text-sm text-zinc-400 font-medium">
                Faça login agora no StellarJam e aproveite o melhor da música.
              </h2>
            </div>

            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 pointer-events-none">
                  <Mail size={14} />
                </div>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  className="pl-9 w-full transition-all focus-visible:ring-[#b7f09c8c] focus:border-[#82dbf7] focus-visible:ring-offset-1 focus-visible:ring-2"
                />
              </div>
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 pointer-events-none">
                  <LockKeyhole size={14} />
                </div>
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  className="pl-9 w-full transition-all focus-visible:ring-[#b7f09c8c] focus:border-[#82dbf7] focus-visible:ring-offset-1 focus-visible:ring-2"
                />
              </div>

              <div className="flex w-full justify-between mt-4">
                <div className="flex gap-2">
                  <Checkbox
                    id="terms"
                    className="border-accent data-[state=checked]:bg-[#b6f09c] data-[state=checked]:text-zinc-900 transition-all"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-zinc-400 pt-[.1rem] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>

                <p
                  className="gradient-text2 cursor-pointer text-sm font-semibold"
                  onClick={() => {
                    toast({
                      title: "Ação Inválida",
                      description: "Esta ação não está disponível no momento.",
                    });
                  }}
                >
                  Forgot Password?
                </p>
              </div>

              <div className="flex w-full justify-between mt-4">
                <Button
                  className="w-full text-zinc-900 font-bold bg-[#B6F09C] hover:bg-[#9bf073] transition-all"
                  type="submit"
                  disabled={
                    !values.email ||
                    !values.password ||
                    values.email === "" ||
                    values.password === ""
                  }
                >
                  Log in
                </Button>
              </div>
            </form>

            <div className="flex gap-2 justify-center items-center">
              <Separator className="w-[30%]" />
              <p className="text-xs text-zinc-600 font-medium">
                or continue with
              </p>
              <Separator className="w-[30%]" />
            </div>

            <div className="flex flex-col gap-4 lg:flex-row">
              <Button
                onClick={handleLoginGoogleClick}
                className="w-full flex gap-2 text-zinc-500 font-bold bg-[#F0F0F0] bg-opacity-5 transition-all hover:bg-opacity-10 hover:text-zinc-400 hover:bg-[#F0F0F0]"
              >
                <Image
                  src={Google}
                  alt="logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="object-cover w-5 h-5"
                />
                Google Account
              </Button>

              <Button
                onClick={handleLoginGithubClick}
                className="w-full flex gap-2 text-zinc-500 font-bold bg-[#F0F0F0] bg-opacity-5 transition-all hover:bg-opacity-10 hover:text-zinc-400 hover:bg-[#F0F0F0]"
              >
                <Github size={20} />
                GitHub Account
              </Button>
            </div>
          </div>
        </div>

        <p className="text-sm text-zinc-500 font-semibold">
          {"Don't have an account?"}{" "}
          <span
            className="gradient-text3 cursor-pointer"
            onClick={() => {
              toast({
                title: "Ação Inválida",
                description: "Esta ação não está disponível no momento.",
              });
            }}
          >
            Sign Up
          </span>
        </p>
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

/* export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      user: "Teste",
    },
  };
};
 */

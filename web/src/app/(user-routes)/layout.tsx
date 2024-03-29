import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return <div className="h-screen">{children}</div>;
}

"use client";
import SideBar from "./components/SideBar";
import { useUser } from "@/app/_context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAdmin, fetchUserData } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchUserData(userId).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/");
    }
  }, [isAdmin, isLoading, router]);

  if (isAdmin) {
    return (
      <div className="flex w-full h-screen overflow-hidden">
        <SideBar />
        <div className="flex-1 overflow-y-auto bg-secondary">{children}</div>
      </div>
    );
  }

  return null;
}

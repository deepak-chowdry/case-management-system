"use client"
import { useUser } from "@stackframe/stack";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const user = useUser({ or: "redirect" })

  useEffect(() => {
    if (user) {
      router.replace("/dashboard")
    }
  })
  return (
    <div className="flex items-center justify-center h-screen">
      <Image src={"/AJ_logo.png"} alt="" width={200} height={200} />
    </div>
  );
}

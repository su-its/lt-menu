"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
  useEffect(() => {
    router.push("/2024/lt");
  }, [router]);
  return <div />;
}

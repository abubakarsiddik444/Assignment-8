"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function GoogleAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { googleLogin } = useAuth();

  useEffect(() => {
    const email = searchParams.get("email") || "google.user@assignment-8.com";
    const name = searchParams.get("name") || "Google User";
    const image = searchParams.get("image") || "";
    const redirectTo = searchParams.get("redirect") || "/";

    googleLogin({ name, email, image });
    router.replace(redirectTo);
  }, [googleLogin, router, searchParams]);

  return null;
}

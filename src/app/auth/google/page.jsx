"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function GoogleAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { googleLogin } = useAuth();

  useEffect(() => {
    const email = searchParams.get("email");
    const authError = searchParams.get("auth_error");

    if (authError || !email) {
      router.replace("/login?auth_error=google_failed");
      return;
    }

    const name = searchParams.get("name") || "Google User";
    const image = searchParams.get("image") || "";
    const redirectTo = searchParams.get("redirect") || "/";

    const authenticate = async () => {
      try {
        await googleLogin({ name, email, image });
      } catch {
        router.replace("/login?auth_error=google_failed");
        return;
      }
      router.replace(redirectTo);
    };

    authenticate();
  }, [googleLogin, router, searchParams]);

  return null;
}

"use client";

import { useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      router.push("/dashboard");
    }
  };

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <button onClick={login} className="bg-black text-white px-6 py-3 rounded">
        Login with Google
      </button>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const useRequireAuth = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/Auth/Login");
    }
  }, [isAuthenticated, router]);

  return user;
};

export default useRequireAuth;

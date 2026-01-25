"use client";

import { useEffect, useState } from "react";

export default function useIsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("admin_token");
      setIsAuthenticated(!!token);
    }
  }, []);

  return isAuthenticated;
}

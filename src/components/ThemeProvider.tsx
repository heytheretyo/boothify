import { useEffect, useState } from "react";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
      <Toaster />
    </ThemeProvider>
  );
}

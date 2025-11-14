import { Footer } from "@/features/home/component/footer";
import { Header } from "@/features/home/component/header";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | VibeCode - AI Code Editor",
    default: "VibeCode - Intelligent Code Editor for Developers",
  },
  description: "Experience the future of coding with AI-powered autocomplete, intelligent debugging, and seamless collaboration.",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      {/* Animated radial background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-br from-blue-500/10 via-transparent to-transparent blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-tl from-purple-500/10 via-transparent to-transparent blur-3xl animate-pulse" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className={cn(
          "pointer-events-none fixed inset-0 opacity-[0.02]",
          "[background-size:32px_32px]",
          "[background-image:linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)]",
          "dark:opacity-[0.03] dark:[background-image:linear-gradient(to_right,#60a5fa_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa_1px,transparent_1px)]",
        )}
      />

      <Header />
      
      <main className="relative z-10 flex-1 w-full">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
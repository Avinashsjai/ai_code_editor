"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPlaygroundFromRepo } from "../actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const GITHUB_URL_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?github\.com\/[^/]+\/[^/#?]+(?:\/?)$|^[^/]+\/[^/#?]+$/i;

function isValidGitHubUrl(url: string): boolean {
  return GITHUB_URL_REGEX.test(url.trim());
}

export default function AddRepoButton() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = url.trim();
    if (!trimmed) {
      setError("Please enter a GitHub repository URL");
      return;
    }

    if (!isValidGitHubUrl(trimmed)) {
      setError("Invalid URL. Use format: github.com/owner/repo or owner/repo");
      return;
    }

    setIsLoading(true);
    try {
      const playground = await createPlaygroundFromRepo(trimmed);
      toast.success("Repository imported successfully");
      setIsDialogOpen(false);
      setUrl("");
      if (playground?.id) {
        router.push(`/playground/${playground.id}`);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to import repository";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !isLoading) {
      setIsDialogOpen(false);
      setUrl("");
      setError(null);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsDialogOpen(true)}
        className="group px-6 py-6 flex flex-row justify-between items-center border rounded-lg bg-muted cursor-pointer 
          transition-all duration-300 ease-in-out
          hover:bg-background hover:border-[#E93F3F] hover:scale-[1.02]
          shadow-[0_2px_10px_rgba(0,0,0,0.08)]
          hover:shadow-[0_10px_30px_rgba(233,63,63,0.15)]"
      >
        <div className="flex flex-row justify-center items-start gap-4">
          <Button
            variant="outline"
            className="flex justify-center items-center bg-white group-hover:bg-[#fff8f8] group-hover:border-[#E93F3F] group-hover:text-[#E93F3F] transition-colors duration-300"
            size="icon"
          >
            <ArrowDown size={30} className="transition-transform duration-300 group-hover:rotate-90" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#e93f3f]">
              Open GitHub Repository
            </h1>
            <p className="text-sm text-muted-foreground max-w-[220px]">
              Work with your repository in our editor
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <Image
            src="/github.svg"
            alt="Create new playground"
            height={150}
            width={150}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Import from GitHub</DialogTitle>
            <DialogDescription>
              Enter a GitHub repository URL to create a playground from its
              structure. Public repositories only.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="github-url">Repository URL</Label>
                <Input
                  id="github-url"
                  placeholder="github.com/owner/repo or owner/repo"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError(null);
                  }}
                  disabled={isLoading}
                  className={error ? "border-destructive" : ""}
                />
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Importing...
                  </>
                ) : (
                  "Import"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

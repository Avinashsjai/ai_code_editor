"use client";

// Replace with your demo video ID from YouTube (e.g., from youtube.com/watch?v=VIDEO_ID)
const DEMO_VIDEO_ID = "M7lc1UVf-VE";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DemoModal({ open, onOpenChange }: DemoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AiCode Editor - Product Demo</DialogTitle>
          <DialogDescription>
            See how AiCode Editor helps you code smarter with AI-powered
            autocomplete, intelligent debugging, and real-time preview.
          </DialogDescription>
        </DialogHeader>
        <div className="relative w-full pt-[56.25%]">
          <iframe
            className="absolute inset-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}`}
            title="AiCode Editor Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Get started with AiCode Editor and experience AI-powered coding today.
        </p>
      </DialogContent>
    </Dialog>
  );
}

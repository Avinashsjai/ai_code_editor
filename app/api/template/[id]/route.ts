import { scanTemplateDirectory } from "@/features/playground/lib/path-to-json";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { db } from "@/lib/db";
import { templatePaths } from "@/lib/template";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "Missing template ID" }, { status: 400 });
    }

    const playground = await db.playground.findUnique({
        where: { id },
    });

    if (!playground) {
        return NextResponse.json({ error: "Playground not found" }, { status: 404 });
    }

    const templateKey = playground.template as keyof typeof templatePaths;
    const templatePath = templatePaths[templateKey];

    if (!templatePath) {
        return NextResponse.json({ error: "Invalid template type" }, { status: 400 });
    }

    try {
        const inputPath = path.join(process.cwd(), templatePath);

        // Scan directly into memory — no file writing needed
        const result = await scanTemplateDirectory(inputPath);

        return NextResponse.json({ success: true, templateJson: result }, { status: 200 });
    } catch (error) {
        console.error("Error generating template JSON:", (error as Error).message);
        return NextResponse.json({ error: "Failed to generate template JSON" }, { status: 500 });
    }
}
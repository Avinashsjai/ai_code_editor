import { readTemplateStructureFromJson, saveTemplateStructureToJson } from "@/features/playground/lib/path-to-json";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { db } from "@/lib/db";   
import { templatePaths } from "@/lib/template";


function validateJsonStructure(data: any): boolean {
    try {
        JSON.parse(JSON.stringify(data));
        return true;
    } catch (error) {
        console.error("Invalid JSON structure:", (error as Error).message);
        return false;
    }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "Missing template ID" }, { status: 400 });
    }

    const playground = await db.playground.findUnique({
        where: { id },
    });

    if (!playground) {
        return Response.json({ error: "Playground not found" }, { status: 404 });
    }

    const templateKey = playground.template as keyof typeof templatePaths;
    const templatePath = templatePaths[templateKey];

    if (!templatePath) {
        return Response.json({ error: "Invalid template type" }, { status: 400 });
    }
    try {
        const inputPath = path.join(process.cwd(), templatePath);
        const outputFile = path.join(process.cwd(), `output/${templateKey}.json`);

        console.log("Input Path:", inputPath);
        console.log("Output File:", outputFile);

        await saveTemplateStructureToJson(inputPath, outputFile);
        const result = await readTemplateStructureFromJson(outputFile);

        if (!validateJsonStructure(result.items)) {
            return Response.json({ error: "Invalid template structure" }, { status: 500 });
        }

        await fs.unlink(outputFile);
        return Response.json({ success: true, templateJson: result }, { status: 200 });
    } catch (error) {
        console.error("Error generating template JSON:", (error as Error).message);
        return Response.json({ error: "Failed to generate template JSON" }, { status: 500 });
    }
}
    

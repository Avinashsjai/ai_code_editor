"use server";
import { currentUser } from "@/features/auth/actions";
import { db } from "@/lib/db";
import { TemplateFolder } from "@/features/playground/lib/path-to-json";
import { revalidatePath } from "next/cache";

export const getPlaygroundById = async (id: string) => {
    try {
        const playground = await db.playground.findUnique({
            where: { id },
            select:{
                    id:true,
                    title:true,
                    description:true,
                templateFiles:{
                    select:{
                        content: true
                    }
                }
            }
        });
        return playground;
    } catch (error) {
        throw new Error("Failed to fetch playground data");
    }
};

export const SaveUpdateCode = async (playgroundId: string, data:TemplateFolder) => {
    const user = await currentUser();
    if (!user)  return null;

    try {
        const updatedPlayground = await db.templateFile.upsert({
            where:{
                playgroundId
            },
            update:{
                content: JSON.stringify(data)
            },
            create:{
                playgroundId,
                content: JSON.stringify(data),
            }
        });
        return updatedPlayground;
    } catch (error) {
        console.log("SaveUpdatedCode error:", error);
    return null;
    }
};

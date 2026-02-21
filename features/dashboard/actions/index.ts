"use server";

import { Templates } from "@prisma/client";
import { currentUser } from "@/features/auth/actions";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { TemplateFolder } from "@/features/playground/types";


export const createPlayground = async (data: {
    title: string;
    template: Templates;
    description?: string;
   
}) => {
    const { template, title, description } = data;

    const user = await currentUser();

    try {
        const playground = await db.playground.create({
            data: {
                title,
                template,
                description,
                userId: user?.id!,
            }
        });
        return playground;
    } catch (error) {
        console.log("Error creating playground:", error);
        throw error;

    }
};

export const getAllPlaygroundForUser = async () => {
    const user = await currentUser();

    try {
        const playground = await db.playground.findMany({
            where: {
                userId: user?.id
            },
            include: {
                user: true,
                Starmark: {
                    where: {
                        userId: user?.id
                    },
                    select: {
                        isMarked: true
                    }
                }
            }
        })
        return playground
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deletProjectBYId = async (id:string)=>{
    try {
        await db.playground.delete({
            where:{id}
        })

        revalidatePath("/dashboard");
    } catch (error) {
        console.error(error);
    }
}


export const editProjectById = async (id:string, data:{title:string, description:string})=>{
    try { 
        await db.playground.update({
            where:{id},
            data:data
        })
        revalidatePath("/dashboard");
    } catch (error) {
        console.error(error);
    }
}

const IGNORED_FOLDERS = ["node_modules", ".git", "dist", "build", "coverage"];
const IGNORED_FILES = ["package-lock.json", "yarn.lock", ".DS_Store"];

function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const trimmed = url.trim();
  const match = trimmed.match(
    /(?:https?:\/\/)?(?:www\.)?github\.com\/([^/]+)\/([^/#?]+)/i
  );
  if (match) return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
  const shortMatch = trimmed.match(/^([^/]+)\/([^/#?]+)$/);
  if (shortMatch) return { owner: shortMatch[1], repo: shortMatch[2] };
  return null;
}

interface GitHubContentItem {
  name: string;
  path: string;
  type: "file" | "dir";
  content?: string;
  size?: number;
}

async function fetchRepoContents(
  owner: string,
  repo: string,
  path: string = ""
): Promise<GitHubContentItem[]> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const url = path
    ? `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
    : `https://api.github.com/repos/${owner}/${repo}/contents`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    if (res.status === 404) throw new Error("Repository not found");
    if (res.status === 403) throw new Error("Access denied - repository may be private");
    throw new Error(`GitHub API error: ${res.status}`);
  }
  return res.json();
}

async function buildTemplateFolder(
  owner: string,
  repo: string,
  folderName: string,
  path: string
): Promise<TemplateFolder> {
  const items: (TemplateFolder["items"][number])[] = [];
  const contents = await fetchRepoContents(owner, repo, path);

  for (const item of contents) {
    if (item.type === "dir") {
      if (IGNORED_FOLDERS.includes(item.name)) continue;
      const subFolder = await buildTemplateFolder(
        owner,
        repo,
        item.name,
        item.path
      );
      items.push(subFolder);
    } else if (item.type === "file") {
      if (IGNORED_FILES.includes(item.name)) continue;
      const lastDot = item.name.lastIndexOf(".");
      const filename = lastDot > 0 ? item.name.slice(0, lastDot) : item.name;
      const fileExtension = lastDot > 0 ? item.name.slice(lastDot + 1) : "";
      let content = "";
      if (item.content) {
        try {
          content = Buffer.from(item.content, "base64").toString("utf-8");
        } catch {
          content = `// Could not decode ${item.name}`;
        }
      } else if (item.size && item.size < 1024 * 1024) {
        const fileRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${item.path}`,
          {
            headers: {
              Accept: "application/vnd.github.v3.raw",
              ...(process.env.GITHUB_TOKEN
                ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
                : {}),
            },
          }
        );
        if (fileRes.ok) content = await fileRes.text();
      }
      items.push({ filename, fileExtension, content });
    }
  }

  return { folderName, items };
}

export const createPlaygroundFromRepo = async (githubUrl: string) => {
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("You must be signed in to import a repository");
  }

  const parsed = parseGitHubUrl(githubUrl);
  if (!parsed) {
    throw new Error(
      "Invalid GitHub URL. Use format: github.com/owner/repo or owner/repo"
    );
  }

  try {
    const templateData = await buildTemplateFolder(
      parsed.owner,
      parsed.repo,
      parsed.repo,
      ""
    );
    const playground = await db.playground.create({
      data: {
        title: `${parsed.repo} (GitHub)`,
        description: `Imported from github.com/${parsed.owner}/${parsed.repo}`,
        template: Templates.REACT,
        userId: user.id,
        templateFiles: {
          create: {
            content: JSON.stringify(templateData),
          },
        },
      },
    });
    revalidatePath("/dashboard");
    return playground;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to import repository";
    throw new Error(message);
  }
};

export const duplicateProjectById = async(id:string)=>{
    try {
        const originalPlayground = await db.playground.findUnique({
            where:{id},
            include:{
                templateFiles: true,
            }
        })

        if(!originalPlayground){
            throw new Error("Playground not found");
        }

        const duplicatePlayground = await db.playground.create({
            data:{
                title:`${originalPlayground.title} (Copy)`,
                description:originalPlayground.description,
                template:originalPlayground.template,
                userId:originalPlayground.userId,
                templateFiles: {
                    create: originalPlayground.templateFiles.map((file) => ({
                        content: file.content,
                    })),
                },
            }
        })

        revalidatePath("/dashboard");

        return duplicatePlayground
    } catch (error) {
        console.error(error);
        return null;
    }
}

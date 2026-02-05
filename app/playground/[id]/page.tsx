"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { usePlayground } from '@/features/playground/hooks/usePlayground';
import { useFileExplorer } from '@/features/playground/hooks/useFileExplorer';
import TemplateFileTree from '@/features/playground/components/template-file-tree';

const Page = () => {
    const { id } = useParams<{ id: string }>();
    const { playgroundData, templateData, isLoading, error, loadPlayground, saveTemplateData } = usePlayground(id);
    const {
        activeFileId,
        closeAllFiles,
        openFile,
        closeFile,
        editorContent,
        updateFileContent,
        handleAddFile,
        handleAddFolder,
        handleDeleteFile,
        handleDeleteFolder,
        handleRenameFile,
        handleRenameFolder,
        openFiles,
        setTemplateData,
        setActiveFileId,
        setPlaygroundId,
        setOpenFiles,
    } = useFileExplorer();

    const handleFileSelect = (file: any) => {
        // Handle file selection logic here
        console.log("File selected:", file);
    };



    return (
        <div>
            <>
                <TemplateFileTree data={templateData!} onFileSelect={handleFileSelect} />

                <SidebarInset>
                    <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
                        <SidebarTrigger className='-ml-1' />
                        <Separator orientation='vertical' className='mr-2 h-4' />

                        <div className='flex flex-1 items-center gap-2'>
                            <div className='flex flex-cal flex-1'>
                                {playgroundData?.title || "Code Playground"}
                            </div>
                        </div>
                    </header>
                </SidebarInset>
            </>
        </div>
    )
}

export default Page;

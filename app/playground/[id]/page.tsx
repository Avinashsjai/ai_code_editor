"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { usePlayground } from '@/features/playground/hooks/usePlayground';

const Page = () => {
    const {id} = useParams<{id: string}>();
    const {playgroundData , templateData, isLoading, error, loadPlayground, saveTemplateData} = usePlayground(id);

    console.log("templateData:", templateData);
    console.log("Playground Data:", playgroundData);

  return (
    <div>
        <>
        {/*todo: templatefile tree */}

        <SidebarInset>
            <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
                <SidebarTrigger className='-ml-1'/>
                <Separator orientation='vertical' className='mr-2 h-4'/>

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

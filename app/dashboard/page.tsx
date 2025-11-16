import React from 'react'
import AddNewaButton from '@/features/dashboard/components/add-new-button';
import AddRepoButton from '@/features/dashboard/components/add-repo-button';
import EmptyState from '@/components/ui/empty-state';
import { deletProjectBYId, duplicatePrijectById, editProjectById, getAllPlaygroundForUser } from '@/features/dashboard/actions';
import ProjectTable from '@/features/dashboard/components/project-table';

const page = async() => {
    const playgrounds = await getAllPlaygroundForUser(); // Placeholder for playground data
  return (
    <div className='flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
            <AddNewaButton />
            <AddRepoButton />
    </div>

    <div className='mt-10 flex flex-col justify-start items-center w-full'>
        {playgrounds && playgrounds.length === 0 ? (<EmptyState title='No projects found' description='Create a new project to get started' imageSrc='/empty-state.svg' />) : (
            //todo add playground list component here
           <ProjectTable 
           //@ts-ignore
           // TODO: NEED TO UPDATE THE TYPES OF THE PLAYGORUND
           projects={playgrounds || []}
           onDeleteProject={deletProjectBYId}
           onUpdateProject={editProjectById}
           onDuplicateProject={duplicatePrijectById}

           />
        )
        }
        </div>
    </div>
  )
}

export default page

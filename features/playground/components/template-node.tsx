import React, { useState } from 'react'
import { ChevronRight, File, Folder, Plus, FilePlus, FolderPlus, MoreHorizontal, Trash2, Edit3, } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, } from '@/aicode-starters/vite-shadcn/src/components/ui/dropdown-menu';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { patchFetch } from 'next/dist/build/templates/app-route';
import { NewFileDialog, NewFolderDialog, RenameFolderDialog } from './template-file-tree';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';


//using the provided inderfaces
interface TemplateFile {
    filename: string
    fileExtension: string
    content: string
}

/**
 * Represents a folder in the temolate structure which can contain files and other folders
 */

interface TemplateFolder {
    folderName: string
    items: (TemplateFile | TemplateFolder)[]
}

//union type for items in the file system
type TemplateItem = TemplateFile | TemplateFolder;

interface TemplateFileTreeProps {
    item: TemplateItem
    onFileSelect: (file: TemplateFile) => void
    selectedFile?: TemplateFile
    level: number
    path?: string
    onAddFile?: (file: TemplateFile, parentPath: string) => void
    onAddFolder?: (folder: TemplateFolder, parentPath: string) => void
    onDeleteFile?: (file: TemplateFile, parentPath: string) => void
    onDeleteFolder?: (folder: TemplateFolder, parentPath: string) => void
    onRenameFile?: (file: TemplateFile, newFileName: string, newExtension: string, parentPath: string) => void
    onRenameFolder?: (folder: TemplateFolder, newFolderName: string, parentPath: string) => void
}

const TemplateNode = ({
    item,
    level,
    path = "",
    onFileSelect,
    selectedFile,
    onAddFile,
    onAddFolder,
    onDeleteFile,
    onDeleteFolder,
    onRenameFile,
    onRenameFolder
}: TemplateFileTreeProps) => {
    const isValidItem = item && (typeof item === 'object');
    const isFolder = isValidItem && 'folderName' in item;
    const [isNewFileDialogOpen, setIsNewFileDialogOpen] = React.useState(false)
    const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = React.useState(false)
    const [isRenameDialogOpen, setIsRenameDialogOpen] = React.useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
    const [isOpen, setIsOpen] = useState(level < 2)

    if (!isValidItem) {
        return null;
    }

    if (!isFolder) {
        const file = item as TemplateFile;
        const fileName = `${file.filename}.${file.fileExtension}`;

        const isSelected =
            selectedFile && selectedFile.filename === file.filename && selectedFile.fileExtension === file.fileExtension

        const handleRename = () => {
            setIsRenameDialogOpen(true)
        }

        const handleDelete = () => {
            setIsDeleteDialogOpen(true)
        }

        const csonfirmDelete = () => {
            onDeleteFile?.(file, path)
            setIsDeleteDialogOpen(false)
        }

        const handleRenameSubmit = (newFilename: string, newExtension: string) => {
            onRenameFile?.(file, newFilename, newExtension, path)
            setIsRenameDialogOpen(false)
        }

        return (
            <SidebarMenuItem>
                <div className='flex items-center group'>
                    <SidebarMenuButton isActive={isSelected} onClick={()=> onFileSelect?.(file)} className='flex-1'>
                        <File className='h-4 w-4 mr-2 shrink-0' />
                        <span>{fileName}</span>
                    </SidebarMenuButton>


                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleRename}>
                                <Edit3 className="mr-2 h-4 w-4" />
                                Rename File
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleDelete} className='text-destructive'>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete File
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </SidebarMenuItem>
        )
    }

    else {
        const folder = item as TemplateFolder;
        const folderName = folder.folderName;
        const currentPath = path ? `${path}/${folderName}` : folderName;

        const handleAddFile = () => {
            setIsNewFileDialogOpen(true)
        }

        const handleAddFolder = () => {
            setIsNewFolderDialogOpen(true)
        }

        const handleRename = () => {
            setIsRenameDialogOpen(true)
        }

        const handleDelete = () => {
            setIsDeleteDialogOpen(true)
        }

        const csonfirmDelete = () => {
            onDeleteFolder?.(folder, path);
            setIsDeleteDialogOpen(false)
        }

        const handleCreateFile = (filename: string, extension: string) => {
            if (onAddFile) {
                const newFile: TemplateFile = {
                    filename,
                    fileExtension: extension,
                    content: "",
                }
                onAddFile(newFile, currentPath)
            }
            setIsNewFileDialogOpen(false)
        }

        const handleCreateFolder = (foldername: string) => {
            if (onAddFolder) {
                const newFolder: TemplateFolder = {
                    folderName,
                    items: [],
                }
                onAddFolder(newFolder, currentPath)
            }
            setIsNewFolderDialogOpen(false)
        }

        const handleRenameSubmit = (newFolderName: string) => {
            onRenameFolder?.(folder, newFolderName, path)
            setIsRenameDialogOpen(false)
        }


        return (
            <SidebarMenuItem>
                <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="group/collapsible [&[data-state=open]>div>button>svg:first-child]:rotate-90">

                    <div className='flex items-center group'>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton className='flex-1'>
                                <ChevronRight className=' transition-transform' />
                                <Folder className='h-4 w-4 mr-2 shrink-0' />
                                <span>{folderName}</span>
                            </SidebarMenuButton>
                        </CollapsibleTrigger>


                        <DropdownMenu>

                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={handleAddFile}>
                                    <FilePlus className="mr-2 h-4 w-4" />
                                    New File
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleAddFolder}>
                                    <FolderPlus className="mr-2 h-4 w-4" />
                                    New Folder
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleRename}>
                                    <Edit3 className="mr-2 h-4 w-4" />
                                    Rename Folder
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleDelete} className='text-destructive'>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Folder
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {folder.items.map((childItem, index) => (
                                <TemplateNode
                                    key={index}
                                    item={childItem}
                                    level={level + 1}
                                    path={currentPath}
                                    onFileSelect={onFileSelect}
                                    selectedFile={selectedFile}
                                    onAddFile={onAddFile}
                                    onAddFolder={onAddFolder}
                                    onDeleteFile={onDeleteFile}
                                    onDeleteFolder={onDeleteFolder}
                                    onRenameFile={onRenameFile}
                                    onRenameFolder={onRenameFolder}
                                />
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </Collapsible>

                <NewFileDialog
                    isOpen={isNewFileDialogOpen}
                    onClose={() => setIsNewFileDialogOpen(false)}
                    onCreateFile={handleCreateFile}
                />

                <NewFolderDialog
                    isOpen={isNewFolderDialogOpen}
                    onClose={() => setIsNewFolderDialogOpen(false)}
                    onCreateFolder={handleCreateFolder}
                />

                <RenameFolderDialog
                    isOpen={isRenameDialogOpen}
                    onClose={() => setIsRenameDialogOpen(false)}
                    onRename={handleRenameSubmit}
                    currentName={folderName}
                />


                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete folder</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete "{folderName}" and all its contents? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={csonfirmDelete}
                                className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SidebarMenuItem>
        )
    }
};

export default TemplateNode;

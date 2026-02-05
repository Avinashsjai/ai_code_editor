"use client";

import React from 'react';
import { ChevronRight, File, Folder, Plus, FilePlus, FolderPlus, MoreHorizontal, Trash2, Edit3, } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarRail, } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, } from '@/aicode-starters/vite-shadcn/src/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import TemplateNode from './template-node';
import { DialogDescription } from '@radix-ui/react-dialog';

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
  data: TemplateItem
  onFileSelect: (file: TemplateFile) => void
  selectedFile?: TemplateFile
  title?: string
  onAddFile?: (file: TemplateFile, parentPath: string) => void
  onAddFolder?: (folder: TemplateFolder, parentPath: string) => void
  onDeleteFile?: (file: TemplateFile, parentPath: string) => void
  onDeleteFolder?: (folder: TemplateFolder, parentPath: string) => void
  onRenameFile?: (file: TemplateFile, newFileName: string, newExtension: string, parentPath: string) => void
  onRenameFolder?: (folder: TemplateFolder, newFolderName: string, parentPath: string) => void
}


const TemplateFileTree = ({
  data, onFileSelect,
  selectedFile,
  title = "File Explorer",
  onAddFile,
  onAddFolder,
  onDeleteFile,
  onDeleteFolder,
  onRenameFile,
  onRenameFolder
}: TemplateFileTreeProps) => {
  const isRootFolder = data && typeof data === 'object' && 'items' in data;
  const [isNewFileDialogOpen, setIsNewFileDialogOpen] = React.useState(false)
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = React.useState(false)

  const handleAddRootFile = () => {
    setIsNewFileDialogOpen(true)
  }

  const handleAddRootFolder = () => {
    setIsNewFolderDialogOpen(true)
  }


  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{title}</SidebarGroupLabel>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarGroupAction>
                <Plus className="h-4 w-4" />
              </SidebarGroupAction>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleAddRootFile}>
                <FilePlus className="mr-2 h-4 w-4" />
                New File
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAddRootFolder}>
                <FolderPlus className="mr-2 h-4 w-4" />
                New Folder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <SidebarGroupContent>
            <SidebarMenu>
              {
                isRootFolder ? ((data as TemplateFolder).items.map((child, index) => (
                  <TemplateNode
                    key={index}
                    item={child}
                    level={0}
                    path=""
                    onFileSelect={onFileSelect}
                    selectedFile={selectedFile}
                    onAddFile={onAddFile}
                    onAddFolder={onAddFolder}
                    onDeleteFile={onDeleteFile}
                    onDeleteFolder={onDeleteFolder}
                    onRenameFile={onRenameFile}
                    onRenameFolder={onRenameFolder}
                  />
                ))
                ) : (
                  <TemplateNode
                    item={data}
                    level={0}
                    path=""
                    onFileSelect={onFileSelect}
                    selectedFile={selectedFile}
                    onAddFile={onAddFile}
                    onAddFolder={onAddFolder}
                    onDeleteFile={onDeleteFile}
                    onDeleteFolder={onDeleteFolder}
                    onRenameFile={onRenameFile}
                    onRenameFolder={onRenameFolder}
                  />
                )

              }


            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />

      <NewFileDialog
        isOpen={isNewFileDialogOpen}
        onClose={() => { setIsNewFileDialogOpen(false) }}
        onCreateFile={() => { }}
      />
      <NewFolderDialog
        isOpen={isNewFolderDialogOpen}
        onClose={() => setIsNewFolderDialogOpen(false)}
        onCreateFolder={() => { }}
      />

    </Sidebar>
  )
};

export default TemplateFileTree;


interface NewFileDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreateFile?: (filename: string, extension: string) => void
}

export function NewFileDialog({ isOpen, onClose, onCreateFile }: NewFileDialogProps) {
  const [filename, setFilename] = React.useState("")
  const [extension, setExtension] = React.useState("js")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (filename.trim()) {
      onCreateFile?.(filename.trim(), extension.trim() || "js")
      setFilename("")
      setExtension("js")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
          <DialogDescription>Enter a name for the new file and select its extension.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='filename' className='text-right'>
                Filename
              </Label>
              <Input
                id="filename"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className='col-span-2'
                autoFocus placeholder='main' />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='extension' className='text-right'>
                Extension
              </Label>
              <Input
                id="extension"
                value={extension}
                onChange={(e) => setExtension(e.target.value)}
                className='col-span-2'
                placeholder='js'
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!filename.trim()}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


interface NewFolderDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreateFolder: (folderName: string) => void
}

export function NewFolderDialog({ isOpen, onClose, onCreateFolder }: NewFolderDialogProps) {
  const [foldername, setFoldername] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (foldername.trim()) {
      onCreateFolder?.(foldername.trim())
      setFoldername("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>Enter a name for the new folder </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='foldername' className='text-right'>
                Folder Name
              </Label>
              <Input
                id="foldername"
                value={foldername}
                onChange={(e) => setFoldername(e.target.value)}
                className='col-span-2'
                autoFocus placeholder='components' />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!foldername.trim()}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


interface RenameFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRename: (newName: string) => void;
  currentName: string;
}

export function RenameFileDialog({
  isOpen,
  onClose,
  onRename,
  currentName,
}: RenameFileDialogProps) {
  const [newName, setNewName] = React.useState(currentName);

  // Update state when dialog opens with new currentName
  React.useEffect(() => {
    if (isOpen) {
      setNewName(currentName);
    }
  }, [isOpen, currentName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = newName.trim();
    if (trimmedName && trimmedName !== currentName) {
      onRename?.(trimmedName);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
          <DialogDescription>
            Enter a new name for the file
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="filename" className="text-right">
                File Name
              </Label>
              <Input
                id="filename"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="col-span-2"
                autoFocus
                placeholder="e.g., page.tsx"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!newName.trim() || newName.trim() === currentName}
            >
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


interface RenameFolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRename: (newName: string) => void;
  currentName: string;
}

export function RenameFolderDialog({
  isOpen,
  onClose,
  onRename,
  currentName,
}: RenameFolderDialogProps) {
  const [newName, setNewName] = React.useState(currentName);

  // Update state when dialog opens with new currentName
  React.useEffect(() => {
    if (isOpen) {
      setNewName(currentName);
    }
  }, [isOpen, currentName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = newName.trim();
    if (trimmedName && trimmedName !== currentName) {
      onRename?.(trimmedName);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Folder</DialogTitle>
          <DialogDescription>
            Enter a new name for the folder
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="foldername" className="text-right">
                Folder Name
              </Label>
              <Input
                id="foldername"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="col-span-2"
                autoFocus
                placeholder="e.g., components"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!newName.trim() || newName.trim() === currentName}
            >
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
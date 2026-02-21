"use client"

import { Button } from "@/components/ui/button"
import { toggleStarMarked } from "@/features/playground/actions"
import { StarIcon, StarOffIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState, useEffect, forwardRef } from "react"
import { toast } from "sonner"

interface MarkedToggleButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  markedForRevision: boolean
  id: string
}

export const MarkedToggleButton = forwardRef<HTMLButtonElement, MarkedToggleButtonProps>(
  ({ markedForRevision, id, onClick, className, children, ...props }, ref) => {
    const router = useRouter()
    const [isMarked, setIsMarked] = useState(markedForRevision)

    useEffect(() => {
      setIsMarked(markedForRevision)
    }, [markedForRevision])

    const handleToggle = async (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event)

      const newMarkedState = !isMarked
      setIsMarked(newMarkedState)

      try {
        const res = await toggleStarMarked(id, newMarkedState)
        const { success, error } = res

        if (success && !error) {
          toast.success(newMarkedState ? "Added to Favorites" : "Removed from Favorites")
          router.refresh()
        } else {
          setIsMarked(!newMarkedState)
          toast.error("Failed to update favorite")
        }
      } catch (err) {
        console.error("Failed to toggle star:", err)
        setIsMarked(!newMarkedState)
        toast.error("Failed to update favorite")
      }
    }

    return (
      <Button
        ref={ref}
        variant="ghost"
        className={`flex items-center justify-start w-full px-2 py-1.5 text-sm rounded-md cursor-pointer ${className}`}
        onClick={handleToggle}
        {...props}
      >
        {isMarked ? (
          <StarIcon size={16} className="text-red-500 mr-2" />
        ) : (
          <StarOffIcon size={16} className="text-gray-500 mr-2" />
        )}
        {children || (isMarked ? "Remove Favorite" : "Add to Favorite")}
      </Button>
    )
  },
)

MarkedToggleButton.displayName = "MarkedToggleButton"
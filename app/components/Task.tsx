import { Data } from "../interfaces"

export default function Task({ 
  children,
  handleDragging
} : { 
  children: Data,
  handleDragging: (dragging: boolean) => void
}) {

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${children.id}`)
    handleDragging(true)
  }

  const handleDragEnd = () => handleDragging(false)

  return (
    <div 
      className="bg-neutral-100 text-base lg:text-lg text-justify p-4 w-4/5 mx-auto normal-case"
      draggable
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      { children.content }
    </div>
  )
}
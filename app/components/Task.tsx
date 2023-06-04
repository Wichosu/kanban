import { Data } from "../interfaces"

interface Props {
  task: Data,
  handleDragging: (dragging: boolean) => void,
  deleteTask: (id: string) => void
}

export default function Task({ 
  task,
  handleDragging,
  deleteTask
} : Props) {

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${task.id}`)
    handleDragging(true)
  }

  const handleDragEnd = () => handleDragging(false)

  const handleDelete = (id: string) => {
    deleteTask(id)
  }

  return (
    <div 
      className="bg-neutral-100 text-base lg:text-lg text-left p-4 w-4/5 mx-auto normal-case
      relative"
      draggable
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div 
        className="absolute top-0 right-0 px-2 text-center mt-2 mr-2 text-red-600 rounded
        text-xs lg:text-base cursor-pointer"
        onClick={() => handleDelete(task.id)}
      >
        &#9747;
      </div>
      { task.content }
    </div>
  )
}
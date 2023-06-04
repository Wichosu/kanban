'use client';

import { Data, Status } from "../interfaces";
import Task from "./Task";

interface Props {
  tasks: Data[],
  status: Status,
  isDragging: boolean,
  handleDragging: (dragging: boolean) => void,
  handleUpdateList: (id: string, status: Status) => void
  deleteTask: (id: string) => void
}

export default function TaskContainer({ 
  tasks,
  status,
  isDragging,
  handleDragging,
  handleUpdateList,
  deleteTask
}: Props) {

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text')
    handleUpdateList(id, status)
    handleDragging(false)
  }

  return (
    <div 
      className="grow-0 flex flex-col gap-4 h-screen"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h1 className="lg:text-3xl text-xl">{ status }</h1>
      {
        tasks.map((task) => (
          status === task.status 
          &&
          <Task 
            key={ task.id }
            task={task}
            handleDragging={handleDragging}
            deleteTask={deleteTask}
          />
        ))
      }
    </div>
  )
}
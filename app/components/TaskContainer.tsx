'use client';

import { Data, Status } from "../interfaces";
import Task from "./Task";
import { useTranslation } from "../i18n/client";

interface Props {
  tasks: Data[],
  status: Status,
  isDragging: boolean,
  lng: string,
  handleDragging: (dragging: boolean) => void,
  handleUpdateList: (id: string, status: Status) => void
  deleteTask: (id: string) => void
}

export default function TaskContainer({ 
  tasks,
  status,
  isDragging,
  lng,
  handleDragging,
  handleUpdateList,
  deleteTask
}: Props) {
  const { t }: any = useTranslation(lng, 'TaskContainer')

  /**
   * 
   * @param e 
   * Prevents default behavior of the element when drag is over
   */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  /**
   * 
   * @param e 
   * Handle the data transfer when a task is drop in this element.
   * gets the id of the task drop and send it to handeUpdateList to update the tasks array
   * finally, sets the dragging state to false
   */
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
      <h1 className="lg:text-3xl text-xl">{ t(status) }</h1>
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
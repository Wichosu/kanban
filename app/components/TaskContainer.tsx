'use client';

import Task from "./Task";

export default function TaskContainer({
  tasks,
  children,
  isDragging,
  handleDragging
}: {
  tasks: string[],
  children: string,
  isDragging: boolean,
  handleDragging: (dragging: boolean) => void
}) {
  return (
    <div className="grow-0 flex flex-col gap-4">
      <h1>{ children }</h1>
      {
        tasks.map((task) => (
          <Task handleDragging={handleDragging}>{ task }</Task>
        ))
      }
    </div>
  )
}
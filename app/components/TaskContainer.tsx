'use client';

import Task from "./Task";

export default function TaskContainer({
  tasks,
  children
}: {
  tasks: string[],
  children: string
}) {
  return (
    <div className="grow-0 flex flex-col gap-4">
      <h1>{ children }</h1>
      {
        tasks.map((task) => (
          <Task>{ task }</Task>
        ))
      }
    </div>
  )
}
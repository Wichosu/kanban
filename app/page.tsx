'use client';

import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import Task from "./components/Task";

export default function Home() {
  const [todoTasks, setTodoTasks] = useState<string[]>([]);

  function addTodoTask(task: string){
    setTodoTasks((tasks) => [...tasks, task])
  }

  useEffect(() => {
    alert(todoTasks)

  }, [todoTasks])

  return (
    <>
      <div className="w-fit mx-auto mt-8">
        <TaskForm addTodoTask={addTodoTask} />
      </div>
      <div className="lg:flex justify-evenly text-center uppercase text-3xl text-neutral-800">
        <div className="grow-0 flex flex-col gap-4">
          <h1>todo</h1>
          {
            todoTasks.map((task) => (
              <Task> { task }</Task>
            ))
          }
        </div>
        <hr className="grow-0 border-neutral-800 opacity-60 border h-screen" />
        <h1>doing</h1>
        <hr className="grow-0 border-neutral-800 opacity-60 border h-screen" />
        <h1>done</h1>
      </div>
    </>
  )
}

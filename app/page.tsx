'use client';

import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";

export default function Home() {
  const [todoTasks, setTodoTasks] = useState<string[]>([]);

  function addTodoTask(task: string){
    setTodoTasks((tasks) => [...tasks, task])
  }

  return (
    <>
      <div className="w-fit mx-auto mt-8">
        <TaskForm addTodoTask={addTodoTask} />
      </div>
      <div className="lg:flex justify-evenly text-center uppercase text-3xl text-neutral-800">
        <h1>todo</h1>
        <hr className="border-neutral-800 opacity-60 border h-screen" />
        <h1>doing</h1>
        <hr className="border-neutral-800 opacity-60 border h-screen" />
        <h1>done</h1>
      </div>
    </>
  )
}

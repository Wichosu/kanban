'use client';

import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskContainer from "./components/TaskContainer";

export default function Home() {
  const [todoTasks, setTodoTasks] = useState<string[]>(() => {
    const tasks = localStorage.getItem('todo')
    if(tasks){
      return JSON.parse(tasks)
    }
    return []
  })

  const [doneTasks, setDoneTasks] = useState<string[]>(() => {
    const tasks = localStorage.getItem('done')
    if(tasks){
      return JSON.parse(tasks)
    }
    return []
  })

  const [isDragging, setIsDragging] = useState(false)

  const handleDragging = (dragging: boolean) => setIsDragging(dragging)

  function addTodoTask(task: string){
    setTodoTasks((tasks) => [...tasks, task])
  }

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todoTasks))
    localStorage.setItem('done', JSON.stringify(doneTasks))

  }, [todoTasks, doneTasks])

  return (
    <>
      <div className="w-fit mx-auto mt-8">
        <TaskForm addTodoTask={addTodoTask} />
      </div>
      <div className="grid grid-cols-3 text-center uppercase text-3xl text-neutral-800">
        <TaskContainer 
          tasks={todoTasks}
          isDragging={isDragging}
          handleDragging={handleDragging}
        >
          todo
        </TaskContainer>
        <TaskContainer 
          tasks={doneTasks}
          isDragging={isDragging}
          handleDragging={handleDragging}
        >
          doing
        </TaskContainer>
        <h1>done</h1>
      </div>
    </>
  )
}

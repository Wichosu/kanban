'use client';

import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskContainer from "../components/TaskContainer";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Data, Status } from "../interfaces";

const kanban: Status[] = ['todo', 'doing', 'done']

export default function Home({ params: { lng }}:{ params: { lng: string }}) {
  const [tasks, setTasks] = useState<Data[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragging = (dragging: boolean) => setIsDragging(dragging)

  const handleUpdateList = (id: string, status: Status) => {
    let task = tasks.find((task) => task.id === id)

    if(task && task.status !== status){
      task.status = status

      setTasks((prev) => ([
        task!,
        ...prev.filter((item) => item.id !== id)
      ]))
    }
  }

  const addTask = (task: Data) => {
    setTasks((tasks) => [...tasks, task])
  }

  const deleteTask = (id: string) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id))
  }

  useEffect(() => {
    setTasks(() => {
      const localTasks = localStorage.getItem('tasks')
      if(localTasks){
        return JSON.parse(localTasks)
      }
      return []
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <>
      <div className="mx-auto mt-6">
        <LanguageSwitcher lng={lng} />
      </div>
      <div className="w-fit mx-auto">
        <TaskForm addTask={addTask} lng={lng} />
      </div>
      <div className="grid grid-cols-3 text-center uppercase text-neutral-800">
        {
          kanban.map((column) => (
            <TaskContainer
              key={column}
              tasks={tasks}
              status={column}
              lng={lng}

              isDragging={isDragging}
              handleDragging={handleDragging}
              handleUpdateList={handleUpdateList}

              deleteTask={deleteTask}
            />
          ))
        }
      </div>
    </>
  )
}

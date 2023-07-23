'use client';

import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskContainer from "../components/TaskContainer";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Data, Status } from "../interfaces";

//Columns of the board
const kanban: Status[] = ['todo', 'doing', 'done']

export default function Home({ params: { lng }}:{ params: { lng: string }}) {
  //Array of all tasks
  const [tasks, setTasks] = useState<Data[]>([])
  //Check if a task is being drag
  const [isDragging, setIsDragging] = useState(false)

  //Set the value of a dragged task
  const handleDragging = (dragging: boolean) => setIsDragging(dragging)

  /**
   * 
   * @param id 
   * @param status 
   * Update the tasks array, if a task is move to another column change the status
   * and update the array
   */
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

  /**
   * 
   * @param task 
   * Add a new task to the array
   */
  const addTask = (task: Data) => {
    setTasks((tasks) => [...tasks, task])
  }

  /**
   * 
   * @param id 
   * Remove a task from the array
   */
  const deleteTask = (id: string) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id))
  }

  /**
   * Get the tasks save in localstorage. if not just set an empty array
   */
  useEffect(() => {
    setTasks(() => {
      const localTasks = localStorage.getItem('tasks')
      if(localTasks){
        return JSON.parse(localTasks)
      }
      return []
    })
  }, [])

  /**
   * Save the state of the array tasks to localstorage. Every change donde to the status
   * of a task, creation or destruction will trigger this.
   */
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <>
      <div className="mx-auto mt-6">
        <LanguageSwitcher lng={lng} />
      </div>
      <div className="flex justify-evenly w-full mx-auto">
        <TaskForm addTask={addTask} lng={lng} />
        <button className="rounded bg-neutral-100 shadow py-2 px-4 cursor-pointer">
          Create new board
        </button>
        {/**
         * This is the select board
         * TODO: 
         *   -Assign name board#n
         *   -Figure out how to save multiple tasks in diferent boards
         *   -Idea create a cookie boards that contains different groups of tasks
         *   -boards[] = [board1 = tasks[], board2 = tasks[], board3 = tasks[]] and so on
         */}
        <select className="rounded bg-neutral-100 shadow py-2 px-4 cursor-pointer">
          <option>Board name</option>
          <option>Board name</option>
          <option>Board name</option>
          <option>Board name</option>
        </select>
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

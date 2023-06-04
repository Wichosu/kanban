'use client';

import { useState, useRef, FormEvent } from "react"
import { Data } from "../interfaces";
import { v4 as uuidv4 } from "uuid";

interface Props {
  addTask: (task: Data) => void
}

export default function TaskForm({ addTask }: Props){
  const [open, setOpen] = useState<boolean>(false)
  const task = useRef<HTMLTextAreaElement>(null)

  function addNewTask(e : FormEvent){
    e.preventDefault();
    if(task.current){
      setOpen(() => false)
      addTask({
        id: uuidv4(),
        content: task.current.value,
        status: "todo"
      })
      task.current.value = ''
    }
  }    

  return (
    <>
      <button 
        className="px-4 py-2 bg-neutral-100 rounded-lg text-neutral-800 capitalize
        text-base shadow"
        onClick={() => setOpen(() => true)}
      >
        create new task
      </button>
      <div 
        className={`${open? 'fixed' : 'hidden'} z-10 left-0 right-0 w-fit bg-red-100 mx-auto p-16`}
      >
        <div 
          className="absolute top-0 right-0 px-2 text-center mt-2 mr-2 text-red-600 rounded
          text-xl cursor-pointer"
          onClick={() => setOpen(() => false)}
        >
          &#9747;
        </div>
        <form className="flex flex-col gap-6" onSubmit={addNewTask}>
          <textarea rows={4} cols={35} required ref={task}></textarea>
          <button 
            className="px-4 py-2 bg-neutral-100 rounded-lg text-neutral-800 capitalize
            text-base shadow"
          >
            create
          </button>
        </form>
      </div>
    </>
  )
}
'use client';

import { useState, useRef, FormEvent } from "react"

export default function TaskForm({ addTodoTask }: { addTodoTask: (task: string) => void}){
  const [open, setOpen] = useState<boolean>(false)
  const task = useRef<HTMLTextAreaElement>(null)

  function addNewTask(e : FormEvent){
    if(task.current){
      alert(task.current.value)
      setOpen(() => false)
    }
    e.preventDefault();
  }    

  return (
    <>
      <button 
        className="px-4 py-2 bg-neutral-200 rounded-lg text-neutral-800 capitalize
        text-base shadow"
        onClick={() => setOpen(() => true)}
      >
        create new task
      </button>
      <div 
        className={`${open? 'fixed' : 'hidden'} z-10 left-0 right-0 w-fit bg-red-200 mx-auto p-16`}
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
            type="submit"
            className="px-4 py-2 bg-neutral-200 rounded-lg text-neutral-800 capitalize
            text-base shadow"
          >
            create
          </button>
        </form>
      </div>
    </>
  )
}
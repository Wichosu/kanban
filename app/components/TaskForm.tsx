'use client';

import { useState, useRef, FormEvent } from "react"
import { Data } from "../interfaces";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "../i18n/client";

interface Props {
  addTask: (task: Data) => void,
  lng: string
}

export default function TaskForm({ addTask, lng }: Props){
  //Trigger for the modal
  const [open, setOpen] = useState<boolean>(false)
  //Ref for the text area that will be the content of the task
  const task = useRef<HTMLTextAreaElement>(null)
  const { t } : any = useTranslation(lng, 'TaskForm')

  /**
   * 
   * @param e 
   * Prevents default behavior of Form.
   * Checks if the textArea is not null, set open to false for the modal to close
   * and Finally send an object to addTask function to create a new task
   */
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
        { t('trigger') }
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
            { t('submit') }
          </button>
        </form>
      </div>
    </>
  )
}
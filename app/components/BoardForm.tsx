'use client'

import { useState, useRef, FormEvent } from "react"
import { Board } from "../interfaces"
import { v4 as uuidv4 } from "uuid"
import { useTranslation } from "../i18n/client"

interface Props {
  addBoard: (board: Board) => void
  lng: string
}

export default function BoardForm({ addBoard, lng}: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const boardName = useRef<HTMLInputElement>(null)
  const { t }: any = useTranslation(lng, 'TaskForm')

  function addNewBoard(e: FormEvent) {
    e.preventDefault();
    if(boardName.current){
      setOpen(() => false)
      addBoard({
        id: uuidv4(),
        name: boardName.current.value,
        tasks: []
      })
      boardName.current.value = ''
    }
  }

  return (
    <>
      <button 
        className="rounded bg-neutral-100 shadow py-2 px-4 cursor-pointer"
        onClick={() => setOpen(() => true)}  
      >
        Create new board
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
        <form className="flex flex-col gap-6" onSubmit={addNewBoard}>
          <input type="text" required ref={boardName} />
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
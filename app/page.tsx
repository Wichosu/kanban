import TaskForm from "./components/TaskForm";

export default function Home() {
  return (
    <>
      <div className="w-fit mx-auto mt-8">
        <TaskForm />
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

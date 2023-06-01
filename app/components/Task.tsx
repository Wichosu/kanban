
export default function Task({ children } : { children: string[]}){
  return (
    <div className="bg-neutral-100 text-lg text-justify p-4">
      { children }
    </div>
  )
}
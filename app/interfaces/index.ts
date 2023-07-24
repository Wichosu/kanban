export type Status = 'todo' | 'doing' | 'done'

export interface Data {
  id: string
  content: string
  status: Status
}

export interface Board {
  id: string
  name: string
  tasks: []
}
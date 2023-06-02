export type Status = 'todo' | 'doing' | 'done'

export interface Data {
  id: number
  content: string
  status: Status
}
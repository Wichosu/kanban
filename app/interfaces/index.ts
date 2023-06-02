export type Status = 'todo' | 'doing' | 'done'

export interface Data {
  id: string
  content: string
  status: Status
}
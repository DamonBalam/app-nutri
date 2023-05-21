import IAuditable from './Auditable'

export interface IRole extends IAuditable {
  id: number
  name: string
  guard_name: string
  pivot?: {}
}

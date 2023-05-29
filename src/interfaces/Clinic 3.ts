import IAuditable from './Auditable'

export interface IClinic extends IAuditable {
  id?: number
  nombre:string
  direccion:string
  telefono:string
}

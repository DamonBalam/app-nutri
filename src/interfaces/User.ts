import IAuditable from './Auditable'
import { IRole } from './Role'

export interface IUser extends IAuditable {
  id?: number | null
  nombre: string
  apellidos: string
  email: string
  telefono: string
  codigo_area: string
  fecha_nacimiento: string
  rol: string
  nutricionista: boolean
  email_verified_at: boolean
  consultorio_id: number | null
  roles: IRole[]
}

export class Usuario implements IUser {
  id?: number | null
  nombre: string
  apellidos: string
  email: string
  telefono: string
  codigo_area: string
  fecha_nacimiento: string
  rol: string
  nutricionista: boolean
  email_verified_at: boolean
  consultorio_id: number | null
  roles: IRole[]

  constructor (user: IUser) {
    this.id = user.id || null
    this.nombre = user.nombre || ''
    this.apellidos = user.apellidos || ''
    this.email = user.email || ''
    this.telefono = user.telefono || ''
    this.codigo_area = user.codigo_area || ''
    this.fecha_nacimiento = user.fecha_nacimiento || ''
    this.rol = user.rol || ''
    this.nutricionista = user.nutricionista || false
    this.email_verified_at = user.email_verified_at || false
    this.consultorio_id = user.consultorio_id || null
    this.roles = user.roles || ''
  }
}

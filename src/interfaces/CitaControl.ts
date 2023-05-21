import IAuditable from './Auditable'

export interface ICitaControl extends IAuditable {
  id?: number
  peso: number | string
  musculo: number | string
  grasas: number | string
  porcentaje_grasa: number | string
  cc: number | string
  grasa_viceral: number | string
  evolucion: string
  cliente_id: number | string
  fecha_cita:string
}

import IAuditable from './Auditable'

export interface IActividadFisica extends IAuditable {
  id: number
  nombre: string
  sku: string
  descripcion: string
}

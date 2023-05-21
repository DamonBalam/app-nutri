import IAuditable from './Auditable'

export interface IObjetivo extends IAuditable {
  id: number
  nombre: string
  sku: string
  descripcion: string
}

import { ISubcategory } from './Subcategory'

export interface ICategory {
  id: number
  nombre: string
  icon?: string
  subcategorias?: ISubcategory[]
}

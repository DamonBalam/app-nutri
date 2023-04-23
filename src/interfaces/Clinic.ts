import IAuditable from './Auditable'

export interface IClinic extends IAuditable {
  id: number
  name: string
  lat?: null
  lng?: null
  phone: string
  address: string
  cp?: null
  state?: null
  country?: null
}

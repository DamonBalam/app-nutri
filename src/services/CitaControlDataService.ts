import { API } from 'src/common/api'
import { ICitaControl } from 'src/interfaces/CitaControl'
import { IResponse } from 'src/interfaces/Response'

class CitaControlDataService {
  async getAll (id: string): Promise<IResponse<ICitaControl[]>> {
    let response = await API.get(`show-history/cita-control/${id}`, {})
    return response.data
  }

  async save (data: ICitaControl): Promise<IResponse<ICitaControl>> {
    let response = await API.post('create/cita-control', { data })
    return response.data
  }
}

export const citaControlDataServices = new CitaControlDataService()

import { API } from 'src/common/api'
import { INutri } from 'src/interfaces/Nutri'
import { IResponse } from 'src/interfaces/Response'

class NutriDataService {
  async getNutriologas (): Promise<IResponse<INutri[]>> {
    let response = await API.get('show/nutricionistas', {})
    return response.data
  }
}

export const nutriDataServices = new NutriDataService()

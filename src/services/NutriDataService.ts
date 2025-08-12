import { API } from 'src/common/api'
import { INutri } from 'src/interfaces/Nutri'
import { IResponse } from 'src/interfaces/Response'
import { useAuthStore } from 'src/stores/auth'
const store = useAuthStore()

const { deleteLocalStorage } = store
class NutriDataService {
  async getNutriologas (): Promise<IResponse<INutri[]>> {
    let response
    try {
      response = await API.get('show/nutricionistas', {})
    } catch (error) {
      deleteLocalStorage()
    }

    return response!.data
  }
}

export const nutriDataServices = new NutriDataService()

import { API } from 'src/common/api'
import { IClinic } from 'src/interfaces/Clinic'
import { IResponse } from 'src/interfaces/Response'
import { useAuthStore } from 'src/stores/auth'
const store = useAuthStore()

const { deleteLocalStorage } = store

class ClinicDataService {
  async getClinics (): Promise<IResponse<IClinic[]>> {
    let response
    try {
      response = await API.get('consultorios', {})
    } catch (error) {
      deleteLocalStorage()
    }

    return response!.data
  }
}

export const clinicDataServices = new ClinicDataService()

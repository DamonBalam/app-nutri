import { API } from 'src/common/api'
import { IClinic } from 'src/interfaces/Clinic'
import { IResponse } from 'src/interfaces/Response'


class ClinicDataService {
  async getClinics (): Promise<IResponse<IClinic[]>> {
    let response = await API.get('consultorios', {})
    return response.data
  }
}

export const clinicDataServices = new ClinicDataService()

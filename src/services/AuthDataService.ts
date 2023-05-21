import { API } from 'src/common/api'
import { IResponse, IResponseAuth } from 'src/interfaces/Response'
import { IUser } from 'src/interfaces/User'

class AuthDataService {
  async login (email: string, password: string): Promise<IResponseAuth<IUser>> {
    let response = await API.post('login', {
      data: {
        email,
        password
      }
    })

    return response.data
  }

  async logout (): Promise<IResponse<null>> {
    let response = await API.get('logout', {})
    return response
  }

  async recover (email: string): Promise<IResponse<any>> {
    let response = await API.post('recover/password', { data: { email } })
    return response
  }
}

export const authDataServices = new AuthDataService()

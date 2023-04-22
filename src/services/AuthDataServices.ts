import { API } from 'src/common/api'
import { IResponse, IResponseAuth } from 'src/interfaces/Response'
import { IUser } from 'src/interfaces/User'

class AuthDataService {
  // login (email: string, password: string): Promise<IResponseAuth<IUser>> {
  //   let _datos = {
  //     email: email,
  //     password: password
  //   }

  //   fetch('https://nutricionista-api.herokuapp.com/api/login', {
  //     method: 'POST',
  //     body: JSON.stringify(_datos),
  //     headers: { 'Content-type': 'application/json; charset=UTF-8' }
  //   })
  //     .then(response => response.json())
  //     .then(json => console.log(json))
  //     .catch(err => console.log(err))
  // }
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
}

export const authDataServices = new AuthDataService()

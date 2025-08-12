import { API } from 'src/common/api'
import { ICategory } from 'src/interfaces/Category'
import { IResponse } from 'src/interfaces/Response'
import { useAuthStore } from 'src/stores/auth'
const store = useAuthStore()

const { deleteLocalStorage } = store
const route = 'categoria'

class CategoryDataService {
  async getCategories (): Promise<IResponse<ICategory[]>> {
    let response

    try {
      response = await API.get('show/categorias', {})
    } catch (error) {
      deleteLocalStorage()
    }

    return response!.data
  }

  async getSubCategoriesByCategoryId (
    id: number
  ): Promise<IResponse<ICategory>> {
    let response

    try {
      response = await API.get('show/categoria/{{id}}/subcategorias', {
        params: {
          id
        }
      })
    } catch (error) {
      deleteLocalStorage()
    }

    return response!.data
  }
}

export const categoryDataServices = new CategoryDataService()

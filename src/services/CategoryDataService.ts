import { API } from 'src/common/api'
import { ICategory } from 'src/interfaces/Category'
import { IResponse } from 'src/interfaces/Response'

const route = 'categoria'

class CategoryDataService {
  async getCategories (): Promise<IResponse<ICategory[]>> {
    let response = await API.get('show/categorias', {})
    return response.data
  }

  async getSubCategoriesByCategoryId (
    id: number
  ): Promise<IResponse<ICategory>> {
    let response = await API.get('show/categoria/{{id}}/subcategorias', {
      params: {
        id
      }
    })
    return response.data
  }
}

export const categoryDataServices = new CategoryDataService()

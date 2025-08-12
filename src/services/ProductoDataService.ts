import { API } from 'src/common/api'
import { IProducto } from 'src/interfaces/Producto'
import { IResponse } from 'src/interfaces/Response'
import { useAuthStore } from 'src/stores/auth'

const store = useAuthStore()

const { deleteLocalStorage } = store
class ProductoDataService {
  async getProductos (): Promise<IResponse<IProducto[]>> {
    let response

    try {
      response = await API.get('show/productos', {})
    } catch (error) {
      console.error(error)
      deleteLocalStorage()
    }

    return response!.data
  }
}

export const productoDataServices = new ProductoDataService()

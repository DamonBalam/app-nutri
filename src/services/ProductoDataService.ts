import { API } from 'src/common/api'
import { IProducto } from 'src/interfaces/Producto'
import { IResponse } from 'src/interfaces/Response'

const route = 'producto'

class ProductoDataService {
  async getProductos (): Promise<IResponse<IProducto[]>> {
    let response = await API.get('show/productos', {})
    return response.data
  }
}

export const productoDataServices = new ProductoDataService()

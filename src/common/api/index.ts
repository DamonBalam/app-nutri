// Incluimos la librería que permite realizar el consumo de servicios REST
import { useAuthStore } from 'stores/auth'
import Axios, { AxiosRequestConfig } from 'axios'
// Incluimos la instancia Vuex

//Incluimos interceptores
// import {setupInterceptorsTo} from '@/common/interceptors';

/**
 * Este método reemplaza los parámetros contenido en la URL en formato <code>{{nombreParametro}}</code>
 * con los valores correspondientes contenidos en el objeto que se recibe en el parámetro params.
 *
 * @param {String} url URL del servicio REST que se desea consumir. La URL puede contener parámetros
 * en el formato <code>{{nombreParametro}}</code>. Los cuales serán reemplazados con sus respectivos
 * valores, contenidos en el objeto <code>params</code>.
 * Ejemplo de una URL:
 *  /api/item/{{itemId}}
 *  /api/location/{{locationId}}/items/{{itemTypeId}}
 *
 * @param {Object} params Un objeto que contiene los valores de los parámetros que serán reemplazados en la URL.
 * Los parámetros corresponden con las propiedades de este objeto, es decir el nombre de la propiedad corresponde
 * al nombre del parámetro en la URL (sensible a minúsculas/mayúsculas).
 *
 * @returns {String} Retorna la url con los valores de los parámetros correspondientes
 * sustituidos en los lugares definidos para tal fin.
 *
 * Para la URL
 *      /api/item/{{itemId}}
 * El objeto params correspondientes es el siguiente
 *  params = {
 *      itemId: 10
 *  }
 * El resultado es el siguiente:
 *  /api/item/10
 *
 * Para la URL
 *      /api/location/{{locationId}}/items/{{itemTypeId}}
 * El objeto params correspondientes es el siguiente
 *  params = {
 *      locationId: 1,
 *      itemTypeId: 10
 *  }
 * El resultado es el siguiente:
 *  /api/location/1/items/10
 *
 */
const formatRequestURL = (url: string, params: any) => {
  if (params) {
    // Si existe el objeto params, iteramos
    // en cada propiedad de éste y la reemplazamos
    // en la url
    Object.keys(params).forEach(key => {
      // Por cada propiedad, generamos una expresión
      // regular para realizar la sustitución global
      // del nombre del parámetro por su valor
      let pattern = RegExp(`{{${key}}}`, 'g')
      url = url.replace(pattern, params[key])
    })
  }

  return url
}

/**
 * Método base para realizar la llamada al servicio REST. Se encarga de
 * reemplazar los parámetros de la URL, y ejecutar la llamada del servicio REST
 * utilizando Axios.
 *
 * @see formatRequestURL
 *
 * @param {String} method Método por el cual será ejecutado el servicio REST (GET/POST/OUT,DELETE,PATCH)
 *
 * @param {String} url URL del servicio REST que se desea consumir. @see formatRequestURL
 * @param {Object} payload
 *  Un objeto que contiene los valores de los parámetros que serán reemplazados en la URL. @see formatRequestURL
 *  y también los valores que serán enviados dentro del BODY (post).
 *
 * {
 *    params: {},
 *    data: {},
 *    headers: {}
 * }
 *
 * -params Un objeto que contiene los valores de los parámetros que serán reemplazados en la URL. @see formatRequestURL
 * -data Información que será enviada al servicio REST.
 * -headers Headers que se incluiran en la llamada al servicio REST.
 */

type JsonPrimitive = string | number | boolean | null
interface JsonMap extends Record<string, JsonPrimitive | JsonArray | JsonMap> {}
interface JsonArray extends Array<JsonPrimitive | JsonArray | JsonMap> {}
type Json = JsonPrimitive | JsonMap | JsonArray

interface Payload {
  params?: Json | any
  data?: Json | any
  headers?: Json | any
}

// const store = useAuthStore()
// const { token } = storeToRefs(store)

const doRequest = (method: string, url: string, payload: Payload) => {
  // Iniciamos el LOADER
  // store.dispatch("initStore/initLoader");
  payload = payload ? payload : ({} as Payload)
  // Obtenemos la información de parametros, headers y contenido (datos)
  // que se van a enviar a la servicio REST
  //
  // @see Object destructuring (https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Destructuring_assignment)
  //
  let { params = {}, data = {}, headers = {} } = payload

  // Creamos el header por default
  // content-type = 'application/json'
  let requestHeaders: Json = {
    'content-type': 'application/json'
  }

  // let token = store.getters["auth/token"];
  // let token = localStorage.getItem('access_token')
  const { token } = useAuthStore()
  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`
  }

  // Realizamos el merge con los headers indicados en el parámetro header
  // de manera que si el header indica un content-type diferente
  // se utilice dicho content-type
  // @see Spread operator https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  const mergeHeaders = { ...requestHeaders, ...headers }

  // Se realiza el proceso de sustitución de parámetros en la URL
  url = formatRequestURL(url, params)

  //Creamos la instancia y le asociamos los interceptores
  // let axios = setupInterceptorsTo(Axios.create())
  let axios = Axios.create()

  // axios.defaults.withCredentials = true;

  // Realizamos la petición al servicio REST
  return axios({
    baseURL: 'https://nutricionista-api.herokuapp.com/api/',
    url: url,
    method: method,
    data: data,
    headers: mergeHeaders
  } as AxiosRequestConfig)
}

/**
 * Definimos el API con los métodos get, post, put, delete y patch para hacer
 * mas fácil el consumo de los servicios REST
 */

export const API = {
  /**
   * Consume un servicio REST utilizando el método GET.
   *
   * @param {String} url URL del servicio REST que se desea consumir. @see formatRequestURL
   * @param {Object} payload
   *
   * {
   *    params: {},
   *    data: {},
   *    headers: {}
   * }
   *  params (OPTIONAL): Un objeto que contiene los valores de los parámetros que serán reemplazados en la URL. @see formatRequestURL
   *  headers (OPTIONAL): Valores que serán enviados en el header
   */
  get: (url: string, payload: Payload) => {
    payload = payload ? payload : ({} as Payload)
    let { params = null } = payload
    if (params) {
      return doRequest('GET', url, payload)
    } else {
      return doRequest('GET', url, { params } as Payload)
    }
  },
  /**
   * Consume un servicio REST utilizando el método POST.
   *
   * @param {String} url URL del servicio REST que se desea consumir. @see formatRequestURL
   * @param {Object} payload
   *  Un objeto que contiene los valores de los parámetros que serán reemplazados en la URL. @see formatRequestURL
   *  y también los valores que serán enviados dentro del BODY (post).
   *
   * {
   *    params: {},
   *    data: {},
   *    headers: {}
   * }
   */
  post: (url: string, payload: Payload) => {
    return doRequest('POST', url, payload)
  },
  /**
   * Consume un servicio REST utilizando el método PUT.
   *
   * @param {String} url URL del servicio REST que se desea consumir. @see formatRequestURL
   * @param {Object} payload
   *  Un objeto que contiene los valores de los parámetros que serán reemplazados en la URL. @see formatRequestURL
   *  y también los valores que serán enviados dentro del BODY (post).
   *
   * {
   *    params: {},
   *    data: {},
   *    headers: {}
   * }   */
  put: (url: string, payload: Payload) => {
    return doRequest('PUT', url, payload)
  },
  /**
   * Consume un servicio REST utilizando el método PATCH.
   *
   * @param {String} url URL del servicio REST que se desea consumir. @see formatRequestURL
   * @param {Object} payload
   *  Un objeto que contiene los valores de los parámetros que serán reemplazados en la URL. @see formatRequestURL
   *  y también los valores que serán enviados dentro del BODY (post).
   *
   * {
   *    params: {},
   *    data: {},
   *    headers: {}
   * }  */
  patch: (url: string, payload: Payload) => {
    return doRequest('PATCH', url, payload)
  },
  /**
   * Consume un servicio REST utilizando el método DELETE.
   *
   * @param {String} url URL del servicio REST que se desea consumir. @see formatRequestURL
   * @param {Object} payload
   *  Un objeto que contiene los valores de los parámetros que serán reemplazados en la URL. @see formatRequestURL
   *  y también los valores que serán enviados dentro del BODY (post).
   *
   * {
   *    params: {},
   *    data: {},
   *    headers: {}
   * }
   */
  delete: (url: string, payload: Payload) => {
    return doRequest('DELETE', url, payload)
  }
}

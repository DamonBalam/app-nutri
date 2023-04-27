
// export interface InformationResponse {
//   msg: string
//   code: number
// }

// export type IError = Pick<InformationResponse, "msg" | "code">
// export type IWarning = Pick<InformationResponse, "msg" | "code">

// export interface IResponse<T> {
//   data: T,
//   errors?: Array<IError>,
//   warnings?: Array<IWarning>
// }

// interface IPaginate<T> {
//   current_page: number,
//   items: T
//   from: number,
//   last_page: number,
//   per_page: number,
//   to: number,
//   total: number,
// }

// export type IPaginationResponse<T> = IResponse<IPaginate<T>>;

export interface IResponse<T> {
  code?: number
  msg?: string
  data: T,
}

export interface IResponseAuth<T> {
  code?: number
  msg?: string
  data: {
    user: T,
    token: string
  },
}


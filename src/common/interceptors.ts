import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
// import store from "../stores";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // store.dispatch('initStore/initLoader').then(r => {});
  return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  //TODO: handle show error messages in interface
  return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // store.dispatch("initStore/stopLoader").then(r => {});
  return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  //TODO: handle show error messages in interface
  // store.dispatch("initStore/stopLoader").then(r => {});
  return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  // axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

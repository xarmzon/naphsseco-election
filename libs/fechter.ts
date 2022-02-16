import { HTTP_RESPONSE_MSG } from './constants'
import { NextApiResponse } from 'next'
import axios from 'axios'

const api = axios.create()

api.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT

api.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default api

export const errorMessage = (e: any, msg?: string) => {
  //console.log(e.response.data);
  return e.response?.data?.msg
    ? e.response.data.msg
    : msg
    ? msg
    : HTTP_RESPONSE_MSG.UNKNOWN_ERROR
}

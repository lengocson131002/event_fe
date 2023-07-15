import axiosClient from './axiosClient'

const AxiosGet = async (url, params = {}, data = {}, headers, responseType) => {
  try {
    const response = await axiosClient.get(url, {
      params,
      data,
      headers,
      responseType
    })
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default AxiosGet

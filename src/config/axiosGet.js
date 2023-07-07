import axiosClient from './axiosClient'

const AxiosGet = async (url, params = {}, data = {}) => {
  try {
    const response = await axiosClient.get(url, { params, data })
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default AxiosGet

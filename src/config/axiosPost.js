import axiosClient from './axiosClient'

const AxiosPost = async (url, data, params = {}) => {
  try {
    const response = await axiosClient.post(url, data, { params })
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default AxiosPost

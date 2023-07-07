import { useEffect, useState } from 'react'
import AxiosGet from '../config/axiosGet'

export const useMajor = () => {
  const [majors, setMajors] = useState()
  const [error, setError] = useState()
  const fetchMajors = () => {
    AxiosGet('/majors')
      .then((res) => setMajors(res.data))
      .catch((err) => setError(err))
  }

  useEffect(() => {
    fetchMajors()
  }, [])

  return { majors, error, fetchMajors }
}

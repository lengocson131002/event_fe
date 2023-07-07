import { useEffect, useState } from 'react'
import AxiosGet from '../config/axiosGet'

export const useSemester = (params) => {
  const [loading, setLoading] = useState(true)
  const [semesters, setSemesters] = useState()
  const [error, setError] = useState()
  const fetchSemester = (params) => {
    setLoading(true)
    AxiosGet('/semesters', params)
      .then((res) => {
        setSemesters(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchSemester(params)
  }, [])

  return { loading, semesters, error, fetchSemester }
}

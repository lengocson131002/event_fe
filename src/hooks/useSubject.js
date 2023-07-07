import { useEffect, useState } from 'react'
import AxiosGet from '../config/axiosGet'

export const useSubjects = () => {
  const [loading, setLoading] = useState(true)
  const [subjects, setSubjects] = useState()
  const [error, setError] = useState()
  const fetchSubjects = () => {
    setLoading(true)
    AxiosGet('/subjects')
      .then((res) => {
        setSubjects(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchSubjects()
  }, [])

  return { loading, subjects, error, fetchSubjects }
}

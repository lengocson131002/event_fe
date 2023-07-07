import { useEffect, useState } from 'react'
import AxiosGet from '../config/axiosGet'

export const useStudentRegistrations = (id, params) => {
  const [loading, setLoading] = useState(true)
  const [studentRegistrations, setStudentRegistrations] = useState()
  const [error, setError] = useState()
  const fetchStudentRegistrations = (id, params) => {
    setLoading(true)
    id &&
      AxiosGet(`/students/${id}/registrations`, params)
        .then((res) => {
          setStudentRegistrations(res.data)
          setLoading(false)
        })
        .catch((err) => {
          setError(err)
          setLoading(false)
        })
  }

  useEffect(() => {
    fetchStudentRegistrations(id, params)
  }, [])

  return { loading, studentRegistrations, error, fetchStudentRegistrations }
}

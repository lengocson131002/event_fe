import { useEffect, useState } from 'react'
import AxiosGet from '../config/axiosGet'

export const useStudents = (params) => {
  const [loading, setLoading] = useState(true)
  const [students, setStudents] = useState()
  const [error, setError] = useState()
  const fetchStudents = (params) => {
    setLoading(true)
    AxiosGet('/students', params)
      .then((res) => {
        setStudents(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchStudents(params)
  }, [])

  return { loading, students, error, fetchStudents }
}

export const useStudent = (id, params) => {
  const [loading, setLoading] = useState(true)
  const [student, setStudent] = useState()
  const [error, setError] = useState()
  const fetchStudent = (params) => {
    setLoading(true)
    AxiosGet(`/students/${id}`, params)
      .then((res) => {
        setStudent(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchStudent(params)
  }, [])

  return { loading, student, error, fetchStudent }
}

import { useEffect, useState } from 'react'
import AxiosGet from '../config/axiosGet'

export const useEventRegistrations = (id, params) => {
  const [loading, setLoading] = useState(true)
  const [eventRegistrations, setEventRegistrations] = useState()
  const [error, setError] = useState()
  const fetchEventRegistrations = (params) => {
    setLoading(true)
    AxiosGet(`/events/${id}/registrations`, params)
      .then((res) => {
        setEventRegistrations(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchEventRegistrations(params)
  }, [id, params])

  return { loading, eventRegistrations, error, fetchEventRegistrations }
}

import { useEffect, useState } from 'react'
import AxiosGet from '../config/axiosGet'

export const useEventManagers = (params) => {
  const [loading, setLoading] = useState(true)
  const [eventManagers, setEventManagers] = useState()
  const [error, setError] = useState()
  const fetchEventManagers = (params) => {
    setLoading(true)
    AxiosGet('/event-managers', params)
      .then((res) => {
        setEventManagers(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchEventManagers(params)
  }, [])

  return { loading, eventManagers, error, fetchEventManagers }
}

export const useEventManager = (id, params) => {
  const [loading, setLoading] = useState(true)
  const [eventManager, setEventManager] = useState()
  const [error, setError] = useState()
  const fetchEventManager = (params) => {
    setLoading(true)
    AxiosGet(`/event-managers/${id}`, params)
      .then((res) => {
        setEventManager(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchEventManager(params)
  }, [])

  return { loading, eventManager, error, fetchEventManager }
}

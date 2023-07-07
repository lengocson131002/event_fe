import { LOCAL_STORAGE_ITEMS } from '../constants/common'

export const useAuth = () => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ITEMS.ACCESS_TOKEN)
  return !!accessToken
}

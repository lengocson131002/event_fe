import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LOGO from '../assets/Logo.png'
import { LOCAL_STORAGE_ITEMS, PATH } from '../constants/common'
import { NotificationCustom } from './Notification'
import USER_HEADER from '../assets/user-1.png'
import MENU from '../assets/menu.png'
import { useAuth } from '../hooks/useAuth'
import AxiosGet from '../config/axiosGet'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../app/global.store'
import { routes } from '../routes/routes'

const HeaderDark = () => {
  const [hidden, setHidden] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useAuth()
  const userInfo = useSelector((state) => state.global.userInfo)

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_ITEMS.ACCESS_TOKEN)
    NotificationCustom({
      type: 'success',
      message: 'Success',
      description: 'Logout Successfully!'
    })
    navigate(PATH.LOGIN)
    
    // clear userinfo
    dispatch(setUserInfo(null))
    
  }
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    AxiosGet('auth/me').then((res) => {
      dispatch(setUserInfo(res.data))
    })
  }, [])

  return (
    <div
      id='home'
      className='w-full flex flex-col lg:flex-row flex-wrap items-center justify-between px-2 lg:px-10 bg-gradient-to-b from-[#FFF1E4] to-[#fff] text-white sticky top-0 z-10 shadow-md'
    >
      <div className='flex items-center pt-2 lg:pt-0'>
        {/* <div
          className='mr-2 lg:mr-4 cursor-pointer'
          onClick={() => navigate(-1)}
        >
          <img
            src={BACK_BUTTON}
            alt='back-button'
            className='w-[20px] lg:w-[26px]'
          />
        </div> */}
        <Link to={!auth ? PATH.EXPLORE : PATH.HOME} className='mb-2'>
          <img src={LOGO} alt='logo' className='w-32 lg:w-36' />
        </Link>
      </div>
      <ul className='flex p-1 lg:p-6 text-[#6F6F6F] text-[13.5px] lg:text-[16px] font-medium'>
        {routes
          .filter((item) => item.allowed?.includes(userInfo?.role))
          .map((item) => (
            <li className='mx-2 lg:mx-10 cursor-pointer'>
              <Link
                to={item.path}
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                activeClass='active'
                className='hover:text-orange transition duration-500 ease-in-out'
              >
                {item.title}
              </Link>
            </li>
          ))}
      </ul>
      {!auth ? (
        <div className='flex items-end gap-4'>
          <Link to={PATH.LOGIN} className='block text-xs md:text-sm'>
            <button className='border px-4 py-1.5 rounded-md border-orange font-semibold text-orange hover:bg-orange hover:text-white duration-200'>
              ĐĂNG NHẬP
            </button>
          </Link>
        </div>
      ) : (
        <div className='flex items-center'>
          <div
            className='mx-3 cursor-pointer'
            onClick={() => navigate(PATH.PROFILE)}
          >
            <img src={USER_HEADER} alt='user-header' />
          </div>

          <div className='mx-2 mt-1 relative'>
            <div onClick={toggleDropdown} className='cursor-pointer'>
              <img src={MENU} alt='menu' aria-hidden='true' />
            </div>
            {isOpen && (
              <div className='absolute z-10 mt-2 -right-10 mr-10 rounded-md shadow-lg'>
                <div className='py-1 bg-white rounded-md shadow-xs'>
                  <Link
                    to={PATH.PROFILE}
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  >
                    Profile
                  </Link>

                  <Link
                    onClick={handleLogout}
                    className='w-[100px] block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  >
                    Log Out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default HeaderDark

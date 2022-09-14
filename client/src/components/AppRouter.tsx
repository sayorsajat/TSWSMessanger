import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectIsLogin } from '../features/redux/user/userSlice'
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, ROOM_WITH_PARAM_ROUTE } from '../lib/utils/routes'
import { Auth } from '../pages/Auth'
import { Home } from '../pages/Home'
import { Room } from '../pages/Room'

export const AppRouter = () => {
  const isLogin = useAppSelector(selectIsLogin);
  const router = isLogin ?
  <Routes>
    <Route path="/*" element={<Navigate replace to={HOME_ROUTE} />} />
    <Route path={HOME_ROUTE} element={<Home />} />
    <Route path={ROOM_WITH_PARAM_ROUTE} element={<Room />} />
  </Routes>
  :
  <Routes>
    <Route path="/*" element={<Navigate replace to={LOGIN_ROUTE} />} />
    <Route path={LOGIN_ROUTE} element={<Auth />} />
    <Route path={REGISTRATION_ROUTE} element={<Auth />} />
  </Routes>

  return (
    router
  )
}

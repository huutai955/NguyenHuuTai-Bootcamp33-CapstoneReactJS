import React from 'react'
import HeaderHome from '../../Components/HeaderHome/HeaderHome'
import {Outlet} from 'react-router-dom'
import FooterHome from '../../Components/FooterHome.jsx/FooterHome'

export default function HomeTemplate() {
  return (
    <>
    <HeaderHome />
    <Outlet />
    <FooterHome />
    </>
  )
}

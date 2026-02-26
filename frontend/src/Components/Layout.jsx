import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div>
      <Navbar></Navbar>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  )
}

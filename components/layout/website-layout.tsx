"use client"
import React from 'react'
import { Navbar } from '../navbar'
import Footer from '../Footer'
import { WebsiteLayoutProps } from './types'



const WebsiteLayout = ({children , data}: WebsiteLayoutProps) => {
  return (
    <>
      <Navbar data={data}/>
      {children}
      <Footer data={data}/>
    </>
  )
}

export default WebsiteLayout
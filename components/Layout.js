import React from 'react'
import { Header } from '../components/index';
 
const Layout = ({ children }) => {
  return (
      <>
           <Header/>
          { children }
      </>
  )
}

export default Layout
import React,{ useState,useEffect } from 'react'
import '../styles/global.scss'
import { Layout } from '../components/index';

function MyApp({ Component, pageProps }) {
  return <Layout>
           <Component {...pageProps} />
         </Layout>
}

export default MyApp

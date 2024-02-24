import React from 'react'
import HeroSection from './components/HeroSection'
import { useGlobalHookAppProvider } from './components/context/AppContext'

export const About = () => {
  const data = {
    name:"Sumit Ecommerce"
  }

  const {about} = useGlobalHookAppProvider()
  return (
    <>
    <h1>{about}</h1>
    <HeroSection myData={data}/>
    </>
  )
}
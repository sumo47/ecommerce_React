import React from 'react'
import HeroSection from './components/HeroSection'

export const About = () => {
  const data = {
    name:"Sumit Ecommerce"
  }
  return (
    <HeroSection myData={data}/>
  )
}
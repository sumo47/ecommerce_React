import React from 'react'
import HeroSection from './components/HeroSection'
import { useGlobalHookAppProvider } from './components/context/AppContext'

export const About = () => {
  const { about } = useGlobalHookAppProvider()
  return (
    <>
      <HeroSection myData={about} />
    </>
  )
}
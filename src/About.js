import React from 'react'
import HeroSection from './components/HeroSection'
import { useGlobalHookAppProvider } from './components/context/AppContext'
import { Button } from './styles/Button'

export const About = () => {


  const { about, state, dispatch } = useGlobalHookAppProvider()
  return (
    <>
      <h1>{state}</h1>
      <Button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</Button>
      <Button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</Button>
      <HeroSection myData={about} />
    </>
  )
}
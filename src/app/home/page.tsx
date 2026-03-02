import React from 'react'
import Navbar from '../components/navbar/navbar'
import Hero from './hero/hero'
import About from './about/about'
import Services from './services/services'
import Footer from '../components/footer/footer'

export default function Home() {
  return (
    <>
        <Navbar/>
        <Hero/>
        <About/>
        <Services/>
        <Footer/>
    </>
    
  )
}

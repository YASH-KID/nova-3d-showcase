import { useState } from 'react'
import { Loader } from '@react-three/drei'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Features from './components/Features'
import Specs from './components/Specs'
import Colorways from './components/Colorways'
import Gallery from './components/Gallery'
import DesignNotes from './components/DesignNotes'
import FAQ from './components/FAQ'
import CTAFooter from './components/CTAFooter'
import CursorGlow from './components/CursorGlow'
import type { Variant } from './components/SneakerModel'

function App() {
  const [variant, setVariant] = useState<Variant>('midnight')

  const handleVariantChange = (next: Variant) => {
    setVariant(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <CursorGlow variant={variant} />
      <Navbar />
      <Loader />
      <main>
        <Hero variant={variant} />
        <Marquee />
        <Features />
        <Specs />
        <Colorways variant={variant} onSelect={handleVariantChange} />
        <Gallery />
        <DesignNotes />
        <FAQ />
        <CTAFooter />
      </main>
    </>
  )
}

export default App

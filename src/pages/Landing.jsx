import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import WhyFusill from '../components/landing/WhyFusill'
import RunANode from '../components/landing/RunANode'
import HowItWorks from '../components/landing/HowItWorks'
import AttackTypes from '../components/landing/AttackTypes'
import MultiVector from '../components/landing/MultiVector'
import Trustless from '../components/landing/Trustless'
import Footer from '../components/landing/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <WhyFusill />
      <HowItWorks />
      <RunANode />
      <AttackTypes />
      <MultiVector />
      <Trustless />
      <Footer />
    </div>
  )
}

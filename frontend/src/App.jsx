import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Hero from './components/sections/Hero'
import FeatureSection from './components/sections/FeatureSection'
import tradingImage from './assets/images/tradingImage.png'
import freeTrial from './assets/images/zero_fees.png'
import baseApp from './assets/images/baseApp.png'
import LearnSection from './components/sections/LearnSection'
import TakeControlSection from './components/sections/TakeControlSection'
import Footer from './components/Footer'
import AppWarningBanner from './components/AppWarningBanner'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import CryptocurrenciesPage from './pages/CryptocurrenciesPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute'

const HomePage = () => {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <main>
        <Hero/>
        <FeatureSection 
          imageSrc={tradingImage}
          heading="Powerful tools, designed for the advanced trader."
          description="Powerful analytical tools, responsive layouts, and live backend data come together in this student-built trading interface."
          ctaText="Start trading"
          imagePosition="left"  
        />
        <FeatureSection 
          imageSrc={freeTrial}
          heading="Zero trading fees, more rewards."
          description="Get more out of crypto with one membership: zero trading fees, boosted rewards, priority support, and more."
          ctaText="Claim Free Trial"
          imagePosition="right"
          badgeText={"COINBASE ONE"}
        />
        <FeatureSection 
          imageSrc={baseApp}
          heading="Countless ways to earn crypto with the Base App."
          description="An everything app to trade, create, discover, and chat, all in one place."
          ctaText="Learn More"
          imagePosition="left"
          badgeText={"BASE APP"}
        />
        <LearnSection />
        
        <TakeControlSection />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <>
      <AppWarningBanner />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/cryptocurrencies' element={<CryptocurrenciesPage />} />
          <Route path='/explore' element={<CryptocurrenciesPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

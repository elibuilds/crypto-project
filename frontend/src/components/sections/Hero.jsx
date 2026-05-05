import React from 'react'
import Hero1 from "../../assets/images/Hero.png"

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 py-6 xl:py-10 grid grid-cols-1 xl:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Text Content Column: order-1 on mobile/tablet, order-2 on large desktop */}
        <div className="flex flex-col order-1 xl:order-2">
          <h1 className="text-5xl md:text-6xl xl:text-[74px] font-thin text-gray-900 leading-tight mb-6 tracking-tight">
            The future of finance is here.
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Trade crypto and more on a platform you can trust.
          </p>

          {/* Email Signup Form */}
          <form 
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            onSubmit={(e) => e.preventDefault()}
          >
            <input 
              type="email" 
              placeholder="satoshi@nakamoto.com" 
              required
              className="flex-1 px-16 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-lg hover:border-gray-400 transition text-left"
            />
            <button 
              type="submit" 
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition text-lg whitespace-nowrap"
            >
              Sign up
            </button>
          </form>
        </div>

        {/* App Mockup Column: order-2 on mobile/tablet, order-1 on large desktop */}
        <div className="flex justify-center order-2 xl:order-1 w-full">
          <img 
            src={Hero1} 
            alt="Crypto dashboard mockup" 
            className="rounded-[50px] w-full h-auto drop-shadow-2xl object-cover"
          />
        </div>

      </div>
    </section>
  )
}

export default Hero

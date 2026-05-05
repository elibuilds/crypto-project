import React from 'react';

const FeatureSection = ({
  imageSrc,
  imageAlt = "Feature Image",
  badgeText, // Optional prop for the tiny pill badge above heading
  heading,
  description,
  ctaText,
  onCtaClick,
  imagePosition = "left" // 'left' or 'right'
}) => {
  return (
    <section className="w-full py-12 md:py-16 lg:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 lg:gap-8 xl:gap-12 items-center">
        
        {/* Image Column - Reorders based on imagePosition prop */}
        <div className={`flex justify-center w-full ${imagePosition === 'right' ? 'md:order-2' : 'md:order-1'} order-1`}>
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="w-full h-auto rounded-[20px] md:rounded-[30px] lg:rounded-[40px] drop-shadow-2xl object-fit"
          />
        </div>

        {/* Text Column - Reorders opposite to the image */}
        <div className={`flex flex-col ${imagePosition === 'right' ? 'md:order-1' : 'md:order-2'} order-2 items-start`}>
          
          {/* Optional Badge */}
          {badgeText && (
            <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-full mb-6 text-gray-700 bg-white shadow-sm w-max">
              <span className="text-sm font-thin tracking-wider uppercase">
                {badgeText}
              </span>
            </div>
          )}

          <h2 className="text-3xl md:text-2xl lg:text-4xl xl:text-[56px] font-medium text-gray-900 leading-tight mb-4 md:mb-6 tracking-tight">
            {heading}
          </h2>
          
          <p className="text-12 lg:text-14 xl:text-xl text-gray-600 mb-6 md:mb-6 leading-relaxed max-w-xl">
            {description}
          </p>

          <div>
            {ctaText && (
              <button 
                onClick={onCtaClick}
                className="px-6 py-3 lg:px-8 lg:py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors text-base lg:text-lg"
              >
                {ctaText}
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

export default FeatureSection;

import React from 'react';
import ArticleCard from '../ArticleCard';

const LearnSection = () => {
  // Use temporary placeholder images matching the aspect ratio until you swap with your own assets
  const articles = [
    {
      id: 1,
      imageSrc: "https://images.unsplash.com/photo-1621501104616-8664bda6ddcc?q=80&w=800&auto=format&fit=crop", // Placeholder
      title: "USDC: The digital dollar for the global crypto economy",
      description: "Many builders believe crypto can help create a more open financial system that is both more efficient and more...",
      underlineTitle: true,
      linkUrl: "#"
    },
    {
      id: 2,
      imageSrc: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=800&auto=format&fit=crop", // Placeholder
      title: "Can crypto really replace your bank account?",
      description: "If you're a big enough fan of crypto, you've probably heard the phrase “be your own bank” or the term “bankless”...",
      underlineTitle: false,
      linkUrl: "#"
    },
    {
      id: 3,
      imageSrc: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=800&auto=format&fit=crop", // Placeholder
      title: "When is the best time to invest in crypto?",
      description: "Cryptocurrencies like Bitcoin can experience daily (or even hourly) price volatility. As with any kind of investment, volatility may cause...",
      underlineTitle: false,
      linkUrl: "#"
    }
  ];

  return (
    <section className="w-full py-10 md:py-20 bg-[#f5f5f5]">
      <div className="mx-auto w-full max-w-350 px-4 py-10 sm:px-6 md:px-12 md:py-16 lg:px-20 lg:py-24">
        
        {/* Header Area */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:mb-16 md:gap-10 lg:mb-20 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <h2 className="max-w-[14ch] text-[2.25rem] font-medium leading-[1.08] tracking-tight text-gray-900 sm:max-w-none sm:text-4xl md:text-5xl lg:text-[64px] lg:leading-[1.05]">
              New to crypto?<span className="hidden sm:inline"><br /></span>{" "}
              Learn some<span className="hidden sm:inline"><br /></span>{" "}
              crypto basics
            </h2>
          </div>
          <div className="flex flex-col items-start lg:col-span-5 lg:pt-4">
            <p className="mb-6 max-w-md text-[1.125rem] leading-relaxed text-gray-600 md:mb-8 md:text-xl">
              Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between
            </p>
            <button className="w-full rounded-full bg-black px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-gray-800 sm:w-auto sm:px-8 sm:py-4 sm:text-lg">
              Read More
            </button>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mt-2 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:mt-0 lg:grid-cols-3 lg:gap-10">
          {articles.map((article) => (
            <ArticleCard 
              key={article.id}
              imageSrc={article.imageSrc}
              title={article.title}
              description={article.description}
              underlineTitle={article.underlineTitle}
              linkUrl={article.linkUrl}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default LearnSection;

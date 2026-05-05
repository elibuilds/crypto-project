import React from 'react';

const ArticleCard = ({ 
  imageSrc, 
  title, 
  description, 
  linkUrl = "#", 
  underlineTitle = false 
}) => {
  return (
    <div className="flex flex-col w-full group cursor-pointer">
      {/* Image Wrapper */}
      <a href={linkUrl} className="block w-full overflow-hidden rounded-[32px] mb-6">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-auto object-cover hover:opacity-90 transition-opacity duration-300" 
        />
      </a>
      
      {/* Article Title */}
      <a href={linkUrl} className="block outline-none">
        <h3 className={`text-2xl md:text-[28px] font-medium text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors ${underlineTitle ? 'underline underline-offset-4 decoration-1 decoration-gray-900' : ''}`}>
          {title}
        </h3>
      </a>
      
      {/* Article Description */}
      <p className="text-base md:text-[17px] text-gray-600 leading-relaxed drop-shadow-none">
        {description}
      </p>
    </div>
  );
};

export default ArticleCard;

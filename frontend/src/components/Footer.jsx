import React from 'react'
import { FaXTwitter, FaLinkedin, FaInstagram, FaTiktok, FaGlobe } from 'react-icons/fa6'
import COLUMNS from './data/footerLinks'
import BrandMark from './BrandMark'
import FooterDisclaimer from './FooterDisclaimer'

const Footer = () => {
  return (
    <footer className='w-full bg-white'>
      <div className='border-t border-gray-200 bg-[#f5f6f7]'>
        <div className='mx-12 w-full max-w-330 px-6 py-12 md:px-10 md:py-14'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:items-start lg:gap-10'>
            <div className='lg:col-span-1'>
              <BrandMark />
            </div>

            {COLUMNS.map((column) => (
              <div key={column.id} className='flex flex-col gap-8 lg:col-span-1'>
                {column.sections.map((section) => (
                  <div key={section.title}>
                    <h3 className='mb-3 text-lg font-semibold leading-tight text-gray-900 md:text-xl'>
                      {section.title}
                    </h3>
                    <ul className='space-y-2'>
                      {section.links.map((link) => (
                        <li key={`${section.title}-${link.label}`}>
                          <a href='#' className='text-base leading-[1.35] text-gray-600 transition-colors hover:text-gray-900 md:text-[17px]'>
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className='mt-10 flex items-center gap-7 border-b border-gray-300 pb-6 text-gray-900'>
            <a href='#' aria-label='Twitter (X)' className='transition-colors hover:text-blue-600'>
              <FaXTwitter className="h-5 w-5" />
            </a>
            <a href='#' aria-label='LinkedIn' className='transition-colors hover:text-blue-600'>
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a href='#' aria-label='Instagram' className='transition-colors hover:text-blue-600'>
              <FaInstagram className="h-5 w-5" />
            </a>
            <a href='#' aria-label='TikTok' className='transition-colors hover:text-blue-600'>
              <FaTiktok className="h-5 w-5" />
            </a>
          </div>

          <div className='flex flex-col gap-4 pt-5 text-sm text-gray-600 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
              <span className='text-gray-900'>© {new Date().getFullYear()} Crypto App</span>
              <span>•</span>
              <a href='#' className='transition-colors hover:text-gray-900'>Privacy</a>
              <span>•</span>
              <a href='#' className='transition-colors hover:text-gray-900'>Terms &amp; Conditions</a>
            </div>

            <div className='flex items-center gap-2'>
              <FaGlobe className='h-5 w-5' />
              <span>Global</span>
              <span>•</span>
              <span>English</span>
            </div>
          </div>

          <FooterDisclaimer />
        </div>
      </div>
    </footer>
  )
}

export default Footer

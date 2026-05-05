import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HiOutlineMagnifyingGlass,
  HiOutlineGlobeAlt,
  HiOutlineBars3,
  HiOutlineXMark,
} from 'react-icons/hi2'
import { menuItems } from './navbar/menuData'
import DropdownSection from './navbar/DropdownSection'
import DropdownCard from './navbar/DropdownCard'
import { useAuth } from '../context/AuthContext'
import BrandMark from './BrandMark'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const { user, isAuthenticated, signOut } = useAuth()
  const navRouteMap = {
    cryptocurrencies: '/cryptocurrencies',
    individuals: '#',
    businesses: '#',
    institutions: '#',
    developers: '#',
    company: '#'
  }

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-[49px] z-50">
      <nav className="mx-10">
        <div className="flex items-center justify-between h-17">
          <div className="flex items-center space-x-10">
            <BrandMark compact />

            <div className="hidden xl:flex items-center gap-5">
              {Object.entries(menuItems).map(([key, menuData]) => (
                <div
                  key={key}
                  className="relative flex items-center h-10"
                  onMouseEnter={() => menuData && setActiveMenu(key)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <a
                    href={navRouteMap[key] || '#'}
                    className="text-md font-semibold text-gray-900 capitalize select-none px-3 py-3 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {key}
                  </a>

                  {menuData && activeMenu === key && (
                    <div className="fixed left-0 right-0 top-[117px] bg-white border-b border-gray-200 shadow-lg">
                      <div className="max-w-350 mx-auto px-6 py-8">
                        <div className="grid grid-cols-3 gap-10">
                          <DropdownSection section={menuData.sections[0]} />
                          <DropdownSection section={menuData.sections[1]} />
                          <DropdownCard card={menuData.card} href={`/${key}`} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="hidden lg:flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <HiOutlineMagnifyingGlass className="w-5 h-5" />
            </button>

            <button className="hidden lg:flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <HiOutlineGlobeAlt className="w-5 h-5" />
            </button>

            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                  {user?.name || user?.email}
                </div>
                <button
                  onClick={() => void signOut()}
                  className="hidden md:block px-5 py-2.5 text-[15px] font-semibold text-white bg-[#0052ff] hover:bg-blue-700 rounded-full transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="hidden md:block px-5 py-2.5 text-[15px] font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                  Sign in
                </Link>

                <Link to="/signup" className="hidden md:block px-5 py-2.5 text-[15px] font-semibold text-white bg-[#0052ff] hover:bg-blue-700 rounded-full transition-colors">
                  Sign up
                </Link>
              </>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMobileMenuOpen
                ? <HiOutlineXMark className="w-6 h-6" />
                : <HiOutlineBars3 className="w-6 h-6" />
              }
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-1">
              {Object.entries(menuItems).map(([key]) => (
                <a
                  key={key}
                  href={navRouteMap[key] || '#'}
                  className="px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md capitalize"
                >
                  {key}
                </a>
              ))}
              <div className="pt-3 border-t border-gray-200 ">
                {isAuthenticated ? (
                  <>
                    <div className="mb-3 px-4 py-2 text-center text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                      {user?.name || user?.email}
                    </div>
                    <button
                      onClick={() => void signOut()}
                      className="block w-full py-2 text-center text-sm font-semibold text-white bg-[#0052ff] hover:bg-blue-700 rounded-full transition-colors"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/signin" className="block w-full px-4 py-2 text-center text-sm font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                      Sign in
                    </Link>
                    <Link to="/signup" className="block w-full py-2 text-center text-sm font-semibold text-white bg-[#0052ff] hover:bg-blue-700 rounded-full transition-colors">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar

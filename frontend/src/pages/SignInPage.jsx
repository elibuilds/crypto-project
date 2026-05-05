import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaApple, FaRegUser } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import BrandMark from '../components/BrandMark'
import FooterDisclaimer from '../components/FooterDisclaimer'

const SignInPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await signIn(formData)
      navigate(location.state?.from?.pathname || '/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen '>
      <header className='px-7 py-6'>
        <BrandMark compact />
      </header>

      <main className='mx-auto flex w-full max-w-107.5 flex-col px-6 pb-10 pt-12 sm:pt-16'>
        <h1 className='text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-3xl'>
          Sign in to Crypto App
        </h1>
        

        <form onSubmit={handleSubmit} className='mt-8'>
          <label htmlFor='signin-email' className='text-md font-semibold text-gray-900'>
            Email
          </label>
          <input
            id='signin-email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Your email address'
            className='mt-2.5 h-14 w-full rounded-lg border border-blue-600 bg-transparent px-4 text-md text-gray-800 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-200'
            required
          />

          <label htmlFor='signin-password' className='mt-5 block text-md font-semibold text-gray-900'>
            Password
          </label>
          <input
            id='signin-password'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter your password'
            className='mt-2.5 h-14 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-md text-gray-800 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
            required
          />

          {error ? <p className='mt-3 text-sm text-red-600'>{error}</p> : null}

          <button
            type='submit'
            disabled={isSubmitting}
            className='mt-4 h-14 w-full rounded-full bg-[#0052ff] text-md font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70'
          >
            {isSubmitting ? 'Signing in...' : 'Continue'}
          </button>
        </form>

        <div className='mt-7 flex items-center gap-4 text-sm font-medium text-gray-500'>
          <span className='h-px flex-1 bg-gray-300' />
          OR
          <span className='h-px flex-1 bg-gray-300' />
        </div>

        <button className='mt-3 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-gray-200 text-md font-semibold text-gray-900'>
          <FaRegUser className='h-5 w-5 text-gray-900' />
          Sign in with Passkey
        </button>
        <button className='mt-3 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-gray-200 text-md font-semibold text-gray-900'>
          <FcGoogle className='h-5 w-5' />
          Sign in with Google
        </button>
        <button className='mt-3 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-gray-200 text-md font-semibold text-gray-900'>
          <FaApple className='h-5 w-5' />
          Sign in with Apple
        </button>

        <p className='mt-8 text-center text-2md font-medium text-gray-900'>
          Don&apos;t have an account?{' '}
          <Link to='/signup' className='text-blue-600 hover:underline'>
            Sign up
          </Link>
        </p>

        <p className='mt-8 text-center text-sm leading-relaxed text-gray-500'>
          This is a classroom demo interface. Use test credentials only. See{' '}
          <a href='#' className='underline underline-offset-2'>
            Privacy Policy
          </a>{' '}
          for more info.
        </p>

        <FooterDisclaimer />
      </main>
    </div>
  )
}

export default SignInPage

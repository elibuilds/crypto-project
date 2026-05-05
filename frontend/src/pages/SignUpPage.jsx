import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import BrandMark from '../components/BrandMark'
import FooterDisclaimer from '../components/FooterDisclaimer'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { signUp } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: searchParams.get('email') || '',
    password: '',
  })
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
      await signUp(formData)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-[#f5f5f5]'>
      <header className='px-7 py-6'>
        <BrandMark compact />
      </header>

      <main className='mx-auto flex w-full max-w-107.5 flex-col px-6 pb-10 pt-12 sm:pt-16'>
        <h1 className='text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl'>
          Create your account
        </h1>
        <p className='mt-1 text-md leading-relaxed text-gray-600'>
          Create a demo account to explore the student project experience.
        </p>
        <form onSubmit={handleSubmit} className='mt-5'>
          <label htmlFor='signup-name' className='text-sm font-semibold text-gray-900'>
            Full name
          </label>
          <input
            id='signup-name'
            name='name'
            type='text'
            value={formData.name}
            onChange={handleChange}
            placeholder='Your full name'
            className='mt-2.5 h-14 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-md text-gray-800 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
            required
          />

          <label htmlFor='signup-email' className='mt-5 block text-sm font-semibold text-gray-900'>
            Email
          </label>
          <input
            id='signup-email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Your email address'
            className='mt-2.5 h-14 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-md text-gray-800 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
            required
          />

          <label htmlFor='signup-password' className='mt-5 block text-sm font-semibold text-gray-900'>
            Password
          </label>
          <input
            id='signup-password'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Create a password'
            className='mt-2.5 h-14 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-md text-gray-800 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
            minLength={6}
            required
          />

          {error ? <p className='mt-3 text-sm text-red-600'>{error}</p> : null}

          <button
            type='submit'
            disabled={isSubmitting}
            className='mt-6 h-14 w-full rounded-full bg-[#0052ff] text-md font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70'
          >
            {isSubmitting ? 'Creating account...' : 'Continue'}
          </button>
        </form>

        <div className='mt-7 flex items-center gap-4 text-sm font-medium text-gray-500'>
          <span className='h-px flex-1 bg-gray-300' />
          OR
          <span className='h-px flex-1 bg-gray-300' />
        </div>

        <button className='mt-2 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-gray-200 text-md font-semibold text-gray-900'>
          <FcGoogle className='h-5 w-5' />
          Sign up with Google
        </button>
        <button className='mt-3 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-gray-200 text-md font-semibold text-gray-900'>
          <FaApple className='h-5 w-5' />
          Sign up with Apple
        </button>

        <p className='mt-8 text-center text-lg font-medium text-gray-900'>
          Already have an account?{' '}
          <Link to='/signin' className='text-blue-600 hover:underline'>
            Sign in
          </Link>
        </p>

        <p className='mt-6 text-center text-sm leading-relaxed text-gray-500'>
          By creating an account you certify that you are over the age of 18 and agree to our{' '}
          <a href='#' className='underline underline-offset-2'>
            User Terms
          </a>{' '}
          and{' '}
          <a href='#' className='underline underline-offset-2'>
            Privacy Policy
          </a>
          .
        </p>

        <FooterDisclaimer />
      </main>
    </div>
  )
}

export default SignUpPage

import { Link } from 'react-router-dom'
import { HiArrowLeft, HiCalendarDays, HiEnvelope, HiShieldCheck, HiUserCircle } from 'react-icons/hi2'
import { useAuth } from '../context/AuthContext'

const ProfilePage = () => {
  const { user } = useAuth()

  return (
    <div className='min-h-screen bg-[linear-gradient(180deg,#f7faff_0%,#eef3fb_100%)] px-4 py-8 md:px-8'>
      <div className='mx-auto max-w-5xl'>
        <Link
          to='/dashboard'
          className='inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50'
        >
          <HiArrowLeft className='h-4 w-4' />
          Back to dashboard
        </Link>

        <div className='mt-6 overflow-hidden rounded-[32px] border border-white/60 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]'>
          <div className='bg-[linear-gradient(135deg,#0f172a_0%,#1c2f63_55%,#2453ff_100%)] px-8 py-10 text-white'>
            <p className='text-sm font-semibold uppercase tracking-[0.28em] text-blue-100'>Protected profile</p>
            <div className='mt-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between'>
              <div className='flex items-center gap-5'>
                <div className='flex h-22 w-22 items-center justify-center rounded-[28px] bg-white/12 text-white'>
                  <HiUserCircle className='h-14 w-14' />
                </div>
                <div>
                  <h1 className='text-4xl font-semibold tracking-tight'>{user?.name}</h1>
                  <p className='mt-2 text-lg text-blue-100'>{user?.email}</p>
                </div>
              </div>

              <div className='rounded-[28px] bg-white/10 px-5 py-4 backdrop-blur'>
                <p className='text-sm font-medium text-blue-100'>Session</p>
                <p className='mt-2 text-xl font-semibold'>Authenticated</p>
              </div>
            </div>
          </div>

          <div className='grid gap-6 p-8 md:grid-cols-3'>
            {[
              {
                title: 'Email address',
                value: user?.email,
                icon: HiEnvelope,
              },
              {
                title: 'Member since',
                value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently',
                icon: HiCalendarDays,
              },
              {
                title: 'Access level',
                value: 'JWT protected',
                icon: HiShieldCheck,
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className='rounded-[28px] border border-slate-200 bg-slate-50 p-6'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf3ff] text-[#2453ff]'>
                    <Icon className='h-6 w-6' />
                  </div>
                  <p className='mt-5 text-sm font-semibold text-slate-500'>{item.title}</p>
                  <p className='mt-2 text-xl font-semibold text-slate-900'>{item.value}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

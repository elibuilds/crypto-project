import { Link } from 'react-router-dom'

const BrandMark = ({ compact = false }) => {
  return (
    <Link to='/' aria-label='Go to homepage' className='inline-flex items-center gap-3'>
      <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2453ff] text-lg font-bold text-white shadow-lg shadow-blue-200/70'>
        C
      </div>
      {!compact ? (
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>Student Project</p>
          <p className='text-lg font-semibold text-slate-900'>Crypto App</p>
        </div>
      ) : null}
    </Link>
  )
}

export default BrandMark

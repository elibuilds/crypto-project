import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = () => {
  const location = useLocation()
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#f4f7fb] text-sm font-medium text-slate-500'>
        Loading your workspace...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to='/signin' replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute

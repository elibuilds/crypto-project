import { createContext, useContext, useEffect, useState } from 'react'
import { authApi } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    const loadProfile = async () => {
      try {
        const profile = await authApi.profile()
        if (!ignore) {
          setUser(profile)
        }
      } catch {
        if (!ignore) {
          setUser(null)
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadProfile()

    return () => {
      ignore = true
    }
  }, [])

  const saveAuth = ({ user: nextUser }) => {
    setUser(nextUser)
    setIsLoading(false)
  }

  const signIn = async (credentials) => {
    const result = await authApi.login(credentials)
    saveAuth(result)
    return result
  }

  const signUp = async (payload) => {
    const result = await authApi.register(payload)
    saveAuth(result)
    return result
  }

  const signOut = () => {
    setUser(null)
    setIsLoading(false)
  }

  const logout = async () => {
    await authApi.logout()
    signOut()
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    signIn,
    signUp,
    signOut: logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

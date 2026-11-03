import { createContext, useContext, useState, useEffect } from 'react'
import { router } from 'expo-router'
import { api } from '@/services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type User = {
  id: string
  name: string
  email: string
  isVerified?: boolean
  avatarUrl?: string | null
  createdAt?: string
  updatedAt?: string
}

type AuthContextData = {
  user: User | null
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateUser: (partial: Partial<User>) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  async function signOut() {
    await AsyncStorage.removeItem('@PaleoHunter:token')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
    router.replace('/')
  }

  useEffect(() => {
    async function loadStoredData() {
      const token = await AsyncStorage.getItem('@PaleoHunter:token')
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        try {
          const response = await api.get<User>('/auth/me')
          setUser(response.data)
        } catch {
          await signOut()
        }
      }
      setLoading(false)
    }
    loadStoredData()
  }, [])

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token, user: loggedUser } = response.data
      await AsyncStorage.setItem('@PaleoHunter:token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(loggedUser)
      router.replace('home' as any)
    } catch (error: unknown) {
      const axiosLike = error as {
        response?: { data?: { message?: string; error?: string } }
      }
      const message =
        axiosLike.response?.data?.error ??
        axiosLike.response?.data?.message ??
        'Invalid credentials'
      console.error('Login error:', message)
      throw new Error(message)
    }
  }

  function updateUser(partial: Partial<User>) {
    setUser((current) => (current ? { ...current, ...partial } : current))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signOut,
        updateUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

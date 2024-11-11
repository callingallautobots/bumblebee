import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '@/lib/api'
import type { User } from '@bumblebee/types'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (data: {
    email: string
    password: string
    name: string
  }) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const { data } = await api.post('/auth/login', { email, password })
          set({ user: data.user, token: data.access_token, isLoading: false })
        } catch (error) {
          set({ error: 'Login failed', isLoading: false })
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.post('/auth/register', data)
          set({
            user: response.data.user,
            token: response.data.access_token,
            isLoading: false,
          })
        } catch (error) {
          set({ error: 'Registration failed', isLoading: false })
        }
      },

      logout: () => {
        set({ user: null, token: null })
        localStorage.removeItem('token')
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

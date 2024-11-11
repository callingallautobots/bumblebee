'use client'

import { LoginForm } from '@/components/auth/LoginForm'
import { useAuthStore } from '@/store/auth'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const { user } = useAuthStore()

  useEffect(() => {
    if (user) {
      redirect('/projects')
    }
  }, [user])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">登录</h1>
        <LoginForm />
      </div>
    </div>
  )
}

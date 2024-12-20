'use client'

import Link from 'next/link'
import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-sm text-zinc-400">
            New to BumbleBee?{' '}
            <Link href="/register" className="text-white hover:text-zinc-300">
              Create an account
            </Link>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

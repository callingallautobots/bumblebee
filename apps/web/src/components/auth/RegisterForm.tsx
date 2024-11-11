import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
})

export function RegisterForm() {
  const router = useRouter()
  const { register: signUp, isLoading, error } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: any) => {
    await signUp(data)
    router.push('/projects')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          {...register('name')}
          placeholder="Name"
          className="bg-zinc-800/50 border-zinc-700"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {String(errors.name.message)}
          </p>
        )}
      </div>

      <div>
        <Input
          {...register('email')}
          placeholder="Email"
          className="bg-zinc-800/50 border-zinc-700"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {String(errors.email.message)}
          </p>
        )}
      </div>

      <div>
        <Input
          {...register('password')}
          type="password"
          placeholder="Password"
          className="bg-zinc-800/50 border-zinc-700"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {String(errors.password.message)}
          </p>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating account...' : 'Create account'}
      </Button>
    </form>
  )
}

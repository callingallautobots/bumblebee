import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少6位'),
})

export function LoginForm() {
  const router = useRouter()
  const { login, isLoading, error } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: any) => {
    await login(data.email, data.password)
    router.push('/projects')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input {...register('email')} placeholder="邮箱" />
        {errors.email && (
          <p className="text-sm text-red-500">{String(errors.email.message)}</p>
        )}
      </div>

      <div>
        <Input {...register('password')} type="password" placeholder="密码" />
        {errors.password && (
          <p className="text-sm text-red-500">
            {String(errors.password.message)}
          </p>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? '登录中...' : '登录'}
      </Button>
    </form>
  )
}

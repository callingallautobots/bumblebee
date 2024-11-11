import { useAuthStore } from '@/store/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            翻译管理系统
          </Link>

          <nav className="flex items-center gap-6">
            {user && (
              <>
                <Link href="/projects" className="hover:text-primary">
                  项目
                </Link>
                <Link href="/users" className="hover:text-primary">
                  用户
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button variant="outline" onClick={logout}>
                  退出
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button>登录</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}

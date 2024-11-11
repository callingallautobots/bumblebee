'use client'

import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function Home() {
  const { user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/projects')
    }
  }, [user, router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800">
      <div className="container mx-auto px-4">
        <header className="py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">BumbleBee</h1>
          {!user && (
            <Link href="/login">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-amber-900"
              >
                登录
              </Button>
            </Link>
          )}
        </header>

        <main className="py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-white mb-6">
              高效的翻译项目管理平台
            </h2>
            <p className="text-xl text-zinc-100 mb-12">
              简单易用的界面，强大的翻译管理功能，助力您的团队更高效地完成翻译项目
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="p-6 bg-white/20 backdrop-blur border-zinc-100/30">
                <h3 className="text-xl font-semibold text-white mb-3">
                  多语言支持
                </h3>
                <p className="text-zinc-50">
                  支持多种语言的翻译管理，轻松处理复杂的多语言项目
                </p>
              </Card>
              <Card className="p-6 bg-white/20 backdrop-blur border-zinc-100/30">
                <h3 className="text-xl font-semibold text-white mb-3">
                  团队协作
                </h3>
                <p className="text-zinc-50">
                  完善的权限管理和工作流程，让团队成员高效协作
                </p>
              </Card>
              <Card className="p-6 bg-white/20 backdrop-blur border-zinc-100/30">
                <h3 className="text-xl font-semibold text-white mb-3">
                  进度监控
                </h3>
                <p className="text-zinc-50">
                  实时统计和可视化报表，随时掌握项目进度
                </p>
              </Card>
            </div>

            <Link href="/login">
              <Button
                size="lg"
                className="bg-white text-zinc-700 hover:bg-zinc-50"
              >
                立即开始
              </Button>
            </Link>
          </div>
        </main>

        <footer className="py-8 text-center text-zinc-100/70 border-t border-zinc-100/20">
          <p>© 2024 BumbleBee. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

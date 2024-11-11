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
      // router.push('/projects')
    }
  }, [user, router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <header className="py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">翻译管理系统</h1>
          {!user && (
            <Link href="/login">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-slate-900"
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
            <p className="text-xl text-slate-300 mb-12">
              简单易用的界面，强大的翻译管理功能，助力您的团队更高效地完成翻译项目
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="p-6 bg-white/10 backdrop-blur border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3">
                  多语言支持
                </h3>
                <p className="text-slate-300">
                  支持多种语言的翻译管理，轻松处理复杂的多语言项目
                </p>
              </Card>
              <Card className="p-6 bg-white/10 backdrop-blur border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3">
                  团队协作
                </h3>
                <p className="text-slate-300">
                  完善的权限管理和工作流程，让团队成员高效协作
                </p>
              </Card>
              <Card className="p-6 bg-white/10 backdrop-blur border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3">
                  进度监控
                </h3>
                <p className="text-slate-300">
                  实时统计和可视化报表，随时掌握项目进度
                </p>
              </Card>
            </div>

            <Link href="/login">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100"
              >
                立即开始
              </Button>
            </Link>
          </div>
        </main>

        <footer className="py-8 text-center text-slate-400 border-t border-white/10">
          <p>© 2024 翻译管理系统. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

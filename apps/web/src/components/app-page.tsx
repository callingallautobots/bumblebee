'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function BlockPage() {
  return (
    <div className="flex h-screen">
      {/* 左侧产品介绍 */}
      <div className="hidden w-1/2 bg-gray-100 lg:block">
        <div className="flex h-full flex-col items-center justify-center p-8 text-center">
          <h1 className="mb-4 text-4xl font-bold">欢迎使用我们的产品</h1>
          <p className="mb-6 text-lg text-gray-600">
            我们的产品提供了革命性的解决方案，帮助您提高工作效率，简化日常任务。
          </p>
          <ul className="mb-6 text-left text-gray-600">
            <li className="mb-2">✓ 直观易用的界面</li>
            <li className="mb-2">✓ 强大的数据分析功能</li>
            <li className="mb-2">✓ 安全可靠的云端存储</li>
            <li>✓ 24/7 客户支持</li>
          </ul>
          <Button variant="secondary">了解更多</Button>
        </div>
      </div>

      {/* 右侧登录注册表单 */}
      <div className="flex w-full items-center justify-center px-4 lg:w-1/2">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">登录</CardTitle>
            <CardDescription>
              输入您的邮箱和密码以登录您的账户
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">密码</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    忘记密码？
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                登录
              </Button>
              <Button variant="outline" className="w-full">
                使用Google账号登录
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              还没有账户？{" "}
              <Link href="#" className="underline">
                注册
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
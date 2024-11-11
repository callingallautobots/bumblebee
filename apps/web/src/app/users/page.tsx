'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { AppLayout } from '@/components/layout/AppLayout'
import { useAuthStore } from '@/store/auth'
import type { User } from '@bumblebee/types'

export default function UsersPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { data: users, error } = useSWR<User[]>('/users')

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  // if (!user) return null
  if (error) return <div>加载失败</div>

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">用户管理</h2>
          <Button>添加用户</Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>邮箱</TableHead>
                <TableHead>姓名</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      编辑
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  )
}

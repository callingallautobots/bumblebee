'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AppLayout } from '@/components/layout/AppLayout'
import { CreateProjectDialog } from '@/components/projects/CreateProjectDialog'
import { useAuthStore } from '@/store/auth'
import { Skeleton } from '@/components/ui/skeleton'
import type { Project } from '@bumblebee/types'

export default function ProjectsPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [search, setSearch] = useState('')
  const { data: projects, error, isLoading } = useSWR<Project[]>('/projects')

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) return null

  const filteredProjects = projects?.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">项目列表</h2>
          <CreateProjectDialog />
        </div>

        <div className="max-w-sm">
          <Input
            placeholder="搜索项目..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {error ? (
          <div className="text-center py-8 text-red-500">
            加载失败，请刷新重试
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-6 w-2/3 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-4/5" />
                <div className="mt-4">
                  <Skeleton className="h-9 w-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects?.map((project) => (
              <Card key={project.id} className="p-6">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {project.description}
                </p>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push(`/projects/${project.id}`)}
                  >
                    查看详情
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}

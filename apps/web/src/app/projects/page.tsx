'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AppLayout } from '@/components/layout/AppLayout'
import { useAuthStore } from '@/store/auth'
import type { Project } from '@bumblebee/types'

export default function ProjectsPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { data: projects, error } = useSWR<Project[]>('/projects')

  useEffect(() => {
    if (!user) {
      // router.push('/login')
    }
  }, [user, router])

  // if (!user) return null
  if (error) return <div>加载失败</div>

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">项目列表</h2>
          <Button>新建项目</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
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
      </div>
    </AppLayout>
  )
}

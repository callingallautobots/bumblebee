'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Project, TranslationStats } from '@bumblebee/types'

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const { data: project } = useSWR<Project>(`/projects/${params.id}`)
  const { data: stats } = useSWR<TranslationStats>(
    `/projects/${params.id}/stats`
  )
  if (!project) return null
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{project.name}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {project.description}
          </p>
        </div>
        <Button>编辑项目</Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="translations">翻译</TabsTrigger>
          <TabsTrigger value="members">成员</TabsTrigger>
          <TabsTrigger value="settings">设置</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <h3 className="text-sm font-medium">总条目</h3>
              <p className="text-2xl font-bold mt-2">{stats?.total || 0}</p>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium">已完成</h3>
              <p className="text-2xl font-bold mt-2">{stats?.approved || 0}</p>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium">完成率</h3>
              <p className="text-2xl font-bold mt-2">
                {stats?.completion || 0}%
              </p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

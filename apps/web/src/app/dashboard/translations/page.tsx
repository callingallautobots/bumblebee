'use client'

import * as React from 'react'
import { useState } from 'react'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// 模拟翻译数据
const mockTranslations = [
  {
    id: 1,
    key: 'welcome_message',
    project: '网站本地化',
    translations: {
      en: 'Welcome to our website',
      es: 'Bienvenido a nuestro sitio web',
      fr: 'Bienvenue sur notre site web',
      de: 'Willkommen auf unserer Webseite',
    },
  },
  {
    id: 2,
    key: 'login_button',
    project: '移动应用翻译',
    translations: {
      en: 'Log In',
      es: 'Iniciar sesión',
      fr: 'Se connecter',
      de: 'Anmelden',
    },
  },
  {
    id: 3,
    key: 'error_message',
    project: '错误处理',
    translations: {
      en: 'An error occurred. Please try again.',
      es: 'Ocurrió un error. Por favor, inténtalo de nuevo.',
      fr: "Une erreur s'est produite. Veuillez réessayer.",
      de: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    },
  },
]

export default function TranslationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState('all')
  const [expandedKeys, setExpandedKeys] = useState<number[]>([])

  const filteredTranslations = mockTranslations.filter(
    (translation) =>
      (selectedProject === 'all' || translation.project === selectedProject) &&
      (translation.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Object.values(translation.translations).some((value) =>
          value.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  )

  const projects = Array.from(new Set(mockTranslations.map((t) => t.project)))

  const toggleExpand = (id: number) => {
    setExpandedKeys((prev) =>
      prev.includes(id) ? prev.filter((key) => key !== id) : [...prev, id]
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">翻译管理</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>搜索和筛选</CardTitle>
          <CardDescription>搜索翻译键或内容，并按项目筛选结果</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                placeholder="搜索翻译键或内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="选择项目" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有项目</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project} value={project}>
                    {project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>翻译列表</CardTitle>
          <CardDescription>显示所有匹配的翻译键及其对应的翻译</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">翻译键</TableHead>
                <TableHead>项目</TableHead>
                <TableHead>翻译</TableHead>
                <TableHead className="w-[100px]">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTranslations.map((translation) => (
                <React.Fragment key={translation.id}>
                  <TableRow>
                    <TableCell className="font-medium">
                      {translation.key}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{translation.project}</Badge>
                    </TableCell>
                    <TableCell>
                      {Object.entries(translation.translations)
                        .slice(0, 2)
                        .map(([lang, text]) => (
                          <div key={lang} className="mb-1">
                            <span className="font-semibold">{lang}:</span>{' '}
                            {text}
                          </div>
                        ))}
                      {Object.keys(translation.translations).length > 2 && (
                        <div className="text-sm text-muted-foreground">
                          +{Object.keys(translation.translations).length - 2}{' '}
                          种语言
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(translation.id)}
                      >
                        {expandedKeys.includes(translation.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {expandedKeys.includes(translation.id)
                            ? '收起'
                            : '展开'}
                        </span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedKeys.includes(translation.id) && (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <div className="p-4 bg-muted rounded-md">
                          {Object.entries(translation.translations).map(
                            ([lang, text]) => (
                              <div key={lang} className="mb-2">
                                <span className="font-semibold">{lang}:</span>{' '}
                                {text}
                              </div>
                            )
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import {
  Archive,
  Download,
  Globe,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
  Upload,
  Users,
  X,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

// Mock data for demonstration
const projectData = {
  id: 1,
  name: '网站本地化项目',
  description: '将公司网站翻译成多种语言，以扩大全球市场覆盖范围。',
  members: [
    { id: 1, name: '张三', role: '项目经理', avatar: '/avatars/01.png' },
    { id: 2, name: '李四', role: '翻译员', avatar: '/avatars/02.png' },
    { id: 3, name: '王五', role: '审核员', avatar: '/avatars/03.png' },
    { id: 4, name: '赵六', role: '翻译员', avatar: '/avatars/04.png' },
    { id: 5, name: '钱七', role: '翻译员', avatar: '/avatars/05.png' },
  ],
  languages: [
    { code: 'en', name: '英语', progress: 80 },
    { code: 'es', name: '西班牙语', progress: 60 },
    { code: 'fr', name: '法语', progress: 40 },
    { code: 'de', name: '德语', progress: 20 },
  ],
  createdAt: '2023-05-01',
  status: '进行中',
}

export default function ProjectDetailPage() {
  const router = useRouter()
  const [project, setProject] = React.useState(projectData)
  const [isAddLanguageDialogOpen, setIsAddLanguageDialogOpen] =
    React.useState(false)
  const [newLanguage, setNewLanguage] = React.useState({ code: '', name: '' })
  const [memberSearchQuery, setMemberSearchQuery] = React.useState('')
  const [isDeleteLanguageDialogOpen, setIsDeleteLanguageDialogOpen] =
    React.useState(false)
  const [languageToDelete, setLanguageToDelete] = React.useState(null)
  const [importFile, setImportFile] = React.useState(null)

  const filteredMembers = project.members.filter(
    (member) =>
      member.name.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(memberSearchQuery.toLowerCase())
  )

  const handleAddLanguage = () => {
    if (newLanguage.code && newLanguage.name) {
      setProject({
        ...project,
        languages: [...project.languages, { ...newLanguage, progress: 0 }],
      })
      setNewLanguage({ code: '', name: '' })
      setIsAddLanguageDialogOpen(false)
    }
  }

  const handleDeleteProject = () => {
    // In a real application, you would call an API to delete the project
    console.log('Deleting project:', project.id)
    router.push('/projects')
  }

  const handleArchiveProject = () => {
    // In a real application, you would call an API to archive the project
    console.log('Archiving project:', project.id)
    setProject({ ...project, status: '已归档' })
  }

  const handleExportTranslations = () => {
    // In a real application, you would generate and download the translations file
    console.log('Exporting translations for project:', project.id)
  }

  const handleImportTranslations = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImportFile(file)
      // In a real application, you would handle file upload and import here
      console.log(
        'Importing translations for project:',
        project.id,
        'File:',
        file.name
      )
    }
  }

  const handleDeleteLanguage = () => {
    if (languageToDelete) {
      setProject({
        ...project,
        languages: project.languages.filter(
          (lang) => lang.code !== languageToDelete.code
        ),
      })
      setLanguageToDelete(null)
      setIsDeleteLanguageDialogOpen(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <MoreHorizontal className="mr-2 h-4 w-4" />
              操作
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>项目操作</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleExportTranslations}>
              <Download className="mr-2 h-4 w-4" />
              导出翻译
            </DropdownMenuItem>
            <DropdownMenuItem>
              <label
                htmlFor="import-file"
                className="flex items-center cursor-pointer"
              >
                <Upload className="mr-2 h-4 w-4" />
                导入翻译
              </label>
              {/* <input
                id="import-file"
                type="file"
                className="hidden"
                onChange={handleImportTranslations}
                accept=".json,.xml,.yml"
              /> */}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleArchiveProject}>
              <Archive className="mr-2 h-4 w-4" />
              归档项目
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDeleteProject}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              删除项目
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>项目详情</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">创建日期</p>
              <p>{project.createdAt}</p>
            </div>
            <div>
              <p className="font-semibold">状态</p>
              <p>{project.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>支持的语言</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {project.languages.map((language) => (
              <div
                key={language.code}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold">{language.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {language.code}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={language.progress} className="w-[100px]" />
                  <span className="text-sm text-muted-foreground">
                    {language.progress}%
                  </span>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setLanguageToDelete(language)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>确认删除语言</AlertDialogTitle>
                        <AlertDialogDescription>
                          您确定要删除 {language.name} 吗？此操作无法撤销。
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteLanguage}>
                          确认删除
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Dialog
            open={isAddLanguageDialogOpen}
            onOpenChange={setIsAddLanguageDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                添加语言
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>添加新语言</DialogTitle>
                <DialogDescription>
                  为项目添加新的目标语言。请输入语言代码和名称。
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="languageCode" className="text-right">
                    语言代码
                  </Label>
                  <Input
                    id="languageCode"
                    value={newLanguage.code}
                    onChange={(e) =>
                      setNewLanguage({ ...newLanguage, code: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="languageName" className="text-right">
                    语言名称
                  </Label>
                  <Input
                    id="languageName"
                    value={newLanguage.name}
                    onChange={(e) =>
                      setNewLanguage({ ...newLanguage, name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddLanguage}>
                  添加语言
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>项目成员</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                placeholder="搜索成员..."
                value={memberSearchQuery}
                onChange={(e) => setMemberSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center space-x-4 bg-secondary p-3 rounded-lg"
              >
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">
            <Users className="mr-2 h-4 w-4" />
            管理成员
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

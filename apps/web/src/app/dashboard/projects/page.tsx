"use client"

import * as React from "react"
import { Plus, Trash2, Users, Globe, MoreHorizontal, ChevronDown, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Mock data for demonstration
const mockProjects = [
  {
    id: 1,
    name: "网站本地化",
    description: "将公司网站翻译成多种语言",
    members: [
      { name: "张三", avatar: "/avatars/01.png" },
      { name: "李四", avatar: "/avatars/02.png" },
      { name: "王五", avatar: "/avatars/03.png" },
    ],
    languages: [
      { code: "en", name: "英语", progress: 80 },
      { code: "es", name: "西班牙语", progress: 60 },
      { code: "fr", name: "法语", progress: 40 },
    ],
  },
  {
    id: 2,
    name: "移动应用翻译",
    description: "翻译 iOS 和 Android 应用界面",
    members: [
      { name: "赵六", avatar: "/avatars/04.png" },
      { name: "钱七", avatar: "/avatars/05.png" },
    ],
    languages: [
      { code: "ja", name: "日语", progress: 70 },
      { code: "ko", name: "韩语", progress: 50 },
    ],
  },
]

export default function ProjectsPage() {
  const [projects, setProjects] = React.useState(mockProjects)
  const [newProjectName, setNewProjectName] = React.useState("")
  const [newProjectDescription, setNewProjectDescription] = React.useState("")
  const [searchQuery, setSearchQuery] = React.useState("")

  const handleCreateProject = () => {
    if (newProjectName && newProjectDescription) {
      const newProject = {
        id: projects.length + 1,
        name: newProjectName,
        description: newProjectDescription,
        members: [],
        languages: [],
      }
      setProjects([...projects, newProject])
      setNewProjectName("")
      setNewProjectDescription("")
    }
  }

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id))
  }

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">项目管理</h1>
        <div className="flex w-full sm:w-auto items-center gap-4">
          <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索项目..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> 新建项目
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>新建项目</DialogTitle>
                <DialogDescription>
                  创建一个新的翻译项目。请填写项目名称和描述。
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    名称
                  </Label>
                  <Input
                    id="name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    描述
                  </Label>
                  <Input
                    id="description"
                    value={newProjectDescription}
                    onChange={(e) => setNewProjectDescription(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateProject}>创建项目</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="flex flex-col justify-between">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <CardDescription className="text-sm line-clamp-2">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4" />
                <div className="flex -space-x-2">
                  {project.members.slice(0, 3).map((member, index) => (
                    <Avatar key={index} className="h-6 w-6 border-2 border-background">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  ))}
                  {project.members.length > 3 && (
                    <Avatar className="h-6 w-6 border-2 border-background">
                      <AvatarFallback>+{project.members.length - 3}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                {project.languages.slice(0, 2).map((language) => (
                  <div key={language.code} className="flex items-center justify-between text-xs">
                    <span>{language.name}</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={language.progress} className="w-16 h-2" />
                      <span className="text-muted-foreground">{language.progress}%</span>
                    </div>
                  </div>
                ))}
                {project.languages.length > 2 && (
                  <div className="text-xs text-muted-foreground">
                    +{project.languages.length - 2} 种语言
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    操作 <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem>查看详情</DropdownMenuItem>
                  <DropdownMenuItem>编辑项目</DropdownMenuItem>
                  <DropdownMenuItem>管理成员</DropdownMenuItem>
                  <DropdownMenuItem>添加语言</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleDeleteProject(project.id)} className="text-red-600">
                    删除项目
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
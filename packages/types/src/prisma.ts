import type { Prisma } from '@bumblebee/database'

// 从 Prisma 导出基础类型
export type User = Prisma.UserGetPayload<{
  include: {
    projects: {
      include: {
        project: true
      }
    }
  }
}>

export type Project = Prisma.ProjectGetPayload<{
  include: {
    members: {
      include: {
        user: true
      }
    }
    namespaces: true
  }
}>

export type Translation = Prisma.TranslationGetPayload<{
  include: {
    creator: true
    key: true
    comments: true
  }
}>

export type Namespace = Prisma.NamespaceGetPayload<{
  include: {
    keys: {
      include: {
        translations: true
      }
    }
  }
}>

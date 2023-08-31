import type { ISort } from './common'

export interface IPost {
  id: number
  title: string
  body: string
  userId: number
  author?: string
}

export interface IPostFilter {
  id: string
  body: string
  userId: string
  title: string
}

export type TPostSort = ISort<keyof IPostFilter>

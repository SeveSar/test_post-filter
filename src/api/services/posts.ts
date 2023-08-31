import type { IPagination } from '@/types/common'
import type { IPost, TPostSort } from '@/types/post'
import type { IPostFilter } from '@/types/post'
import type { AxiosInstance } from 'axios'

export class PostsService {
  $http: AxiosInstance
  constructor(httpClient: AxiosInstance) {
    this.$http = httpClient
  }
  async getPosts({ filters, pagination }: { filters: { userId?: number[] }; pagination: IPagination }): Promise<{ data: IPost[]; total: string }> {
    const { currentPage, limit } = pagination
    const params: { _page: number; _limit: number; userId?: number[] } = {
      _page: currentPage,
      _limit: limit
    }
    const url = `/posts`

    const keysFilters = Object.keys(filters) as (keyof { userId?: string })[]

    keysFilters.forEach((key) => {
      params[key] = filters[key] ?? []
    })

    const response = await this.$http.get<IPost[]>(url, {
      params: params
    })
    return {
      total: response.headers['x-total-count'],
      data: response.data
    }
  }

  async getPostById(id: number) {
    const response = await this.$http.get<IPost>(`/posts/${id}`)

    return response.data
  }
}

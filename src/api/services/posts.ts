import type { IPagination } from '@/types/common'
import type { IPost, TPostSort } from '@/types/post'
import type { IPostFilter } from '@/types/post'
import type { AxiosInstance } from 'axios'

export class PostsService {
  $http: AxiosInstance
  constructor(httpClient: AxiosInstance) {
    this.$http = httpClient
  }
  async getPosts({
    filters,
    sorts,
    pagination
  }: {
    filters: IPostFilter
    sorts: TPostSort
    pagination: IPagination
  }): Promise<{ data: IPost[]; total: string }> {
    const { sortColumn, sortDirection } = sorts
    const { currentPage, limit } = pagination

    let url = `/posts?_page=${currentPage}&_limit=${limit}`

    const keysFilters = Object.keys(filters) as (keyof IPostFilter)[]

    keysFilters.forEach((key) => {
      if (filters[key]) {
        url += `&${key}_like=${filters[key] || ''}`
      }
    })

    if (sortColumn) {
      url += `&_sort=${sortColumn}&_order=${sortDirection}`
    }

    const response = await this.$http.get<IPost[]>(url)
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

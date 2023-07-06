import type { TUserSort } from '@/types/user'
import type { IPagination } from '@/types/common'
import type { IUser, IUserFilter } from '@/types/user'
import type { AxiosInstance } from 'axios'

export class UsersService {
  $http: AxiosInstance
  constructor(httpClient: AxiosInstance) {
    this.$http = httpClient
  }

  async getUsers({
    filters,
    sorts,
    pagination
  }: {
    filters: IUserFilter
    sorts: TUserSort
    pagination: IPagination
  }): Promise<{ data: IUser[]; total: string }> {
    const { sortColumn, sortDirection } = sorts
    const { currentPage, limit } = pagination

    let url = `/users?_page=${currentPage}&_limit=${limit}`

    const keysFilters = Object.keys(filters) as (keyof IUserFilter)[]

    keysFilters.forEach((key) => {
      if (filters[key]) {
        url += `&${key}_like=${filters[key] || ''}`
      }
    })

    if (sortColumn) {
      url += `&_sort=${sortColumn}&_order=${sortDirection}`
    }

    const response = await this.$http.get<IUser[]>(url)

    return {
      total: response.headers['x-total-count'],
      data: response.data
    }
  }
  async getUserById(id: number) {
    const response = await this.$http.get<IUser>(`/users/${id}`)

    return response.data
  }
}

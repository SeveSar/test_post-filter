import type { IUser } from '@/types/user'
import type { AxiosInstance } from 'axios'

export class UsersService {
  $http: AxiosInstance
  constructor(httpClient: AxiosInstance) {
    this.$http = httpClient
  }

  async getUsers(): Promise<{ data: IUser[]; total: string }> {
    const url = `/users`

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

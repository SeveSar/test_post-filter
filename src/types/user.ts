import type { ISort } from './common'
export interface IUser {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface IUserFilter {
  id: string
  name: string
  email: string
  username: string
  phone: string
  website: string
}

export type TUserSort = ISort<keyof IUserFilter>

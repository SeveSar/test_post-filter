export interface IPagination {
  limit: number
  currentPage: number
}

export interface ISort<T> {
  sortColumn: T | ''
  sortDirection: 'asc' | 'desc'
}

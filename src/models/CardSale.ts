export interface ICardSale {
  id: number
  isChecked: boolean
  info: ICardSaleInfo
}

export interface ICardSaleInfo {
  price: string
  typeSale?: ITypeSale
  status: IStatus
  address: IAddress
  params: IParams
  street: string
}
export interface IParams {
  nomer: string
  area: string
  rooms?: string
  floor?: string
}

export interface ITypeSale {
  title: string
  value: TypeSaleValue
  tooltip: string
}

export interface IStatus {
  title: string
  value: 'physical' | 'juristic' | 'sold' | 'booked'
}

export type TypeSaleValue = 'flat' | 'parking'
export interface IAddress {
  address: string
  corps: string
}

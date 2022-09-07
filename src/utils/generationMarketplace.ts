import { IProductResponse } from 'app/interface/IProduct'

import mapper from '../mapper/mapper.json'

let marketplace = {}

export default (product: IProductResponse) => {
  for (const field of mapper.fields) {
    const arrayFieldMarket = field.fieldMarket.split('.')
    arrayFieldMarket.forEach((value, index) => {
      marketplace[value] = { arrayFieldMarket[index + 1]: {} }
    })
  }
  return marketplace
}

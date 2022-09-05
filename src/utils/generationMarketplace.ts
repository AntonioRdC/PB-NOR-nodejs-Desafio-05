import { IProductResponse } from 'app/interface/IProduct'

import mapper from '../mapper/mapper.json'

const marketplace = {}
const productMapper = {}

export default (product: IProductResponse) => {
  for (const field of mapper.fields) {
    const arrayFieldMarket = field.fieldMarket.split('.')
  }
  return marketplace
}

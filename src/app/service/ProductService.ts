import { PaginateResult, Types } from 'mongoose'

import { IProductResponse, IProduct, IQueryGet, IMapper } from '../interface/IProduct'
import ProductRepository from '../repository/ProductRepository'
import BadRequestError from '../error/BadRequestError'
import NotFoundError from '../error/NotFoundError'
import mapper from '../../mapper/mapper.json'

class ProductService {
  public async create (payload: any): Promise<IProductResponse> {
    const result = await ProductRepository.create(payload)

    return result
  }

  public async get (payload: IQueryGet, page: number, limit: number): Promise<PaginateResult<IProductResponse>> {
    const result = await ProductRepository.get(payload, page, limit)

    if (result.totalCount === 0) throw new NotFoundError('Not found products')
    if (Number(result.currentPage) > result.totalPages) throw new NotFoundError('Not found products')

    return result
  }

  public async getById (id: string): Promise<IProductResponse> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Id not valid')

    const result = await ProductRepository.getById(id)

    if (!result) throw new NotFoundError('Not found product')

    return result
  }

  public async update (id: string, payload: IProduct): Promise<IProductResponse> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Id not valid')

    if (payload.qtd_stock === 0) payload.stock_control_enabled = false
    if (payload.qtd_stock !== 0) payload.stock_control_enabled = true

    const result = await ProductRepository.update(id, payload)

    if (!result) throw new NotFoundError('Not found product')

    return result
  }

  public async delete (id: string): Promise<IProductResponse> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Id not valid')

    const result = await ProductRepository.delete(id)

    if (!result) throw new NotFoundError('Not found product')

    return result
  }

  public async getLowStock (page: number, limit: number): Promise<PaginateResult<IProductResponse>> {
    const payload = { qtd_stock: { $lt: 100 } }
    const result = await ProductRepository.get(payload, page, limit)

    if (result.totalCount === 0) throw new NotFoundError('Not found products')
    if (Number(result.currentPage) > result.totalPages) throw new NotFoundError('Not found products')

    return result
  }

  public async createWithCsv (payload: any): Promise<object> {
    const errorDetails: Array<object> = []
    let productsCount = 0

    for (const product of payload) {
      const error: string[] = []

      if (!product.title) error.push('title must be required')
      if (!product.description) error.push('description must be required')
      if (!product.department) error.push('department must be required')
      if (!product.brand) error.push('brand must be required')
      if (!product.price) error.push('price must be required')
      if (!product.qtd_stock) error.push('qtd_stock must be required')
      if (!product.bar_codes) error.push('bar_codes must be required')

      if (product.bar_codes.length !== 13) error.push('bar_codes must be 13 characters')
      if (product.price < 0.01 || product.price > 1000) error.push('price must be between 0.01 and 1000')
      if (product.qtd_stock < 1 || product.qtd_stock > 100000) error.push('price must be between 1 and 100000')

      if (await ProductRepository.getByBarCode(product.bar_codes)) error.push('bar_codes must be unique')

      if (!Number.isInteger(product.qtd_stock)) error.push('qtd_stock must be integer')

      if (error[0] && error.length > 1) {
        errorDetails.push({
          title: product.title,
          bar_code: product.bar_codes,
          error
        })
      } if (error[0] && error.length === 1) {
        errorDetails.push({
          title: product.title,
          bar_code: product.bar_codes,
          error: error[0]
        })
      } else {
        productsCount += 1
        await ProductRepository.create(product)
      }
    }

    return {
      success: productsCount,
      errors: errorDetails.length,
      errorDetails
    }
  }

  public async getMarketplace (id: string) {
    const result = await ProductRepository.getById(id)
    if (!result) throw new NotFoundError('Not found product')

    const { fields }:IMapper = mapper

    const arrayMarketObject:Array<Object> = []

    fields.forEach(field => {
      const { fieldProduct, fieldMarket, type, optional } = field

      const product = fieldProduct.replace('product.', '')
      const market = fieldMarket.split('.')

      const marketObject = {}

      market.reduce((prevVal: Object, elem: string): Object => {
        if (market.indexOf(elem) === market.length - 1) {
          switch (type) {
            case ('text'):
              prevVal[elem] = result[product].toString()
              break
            case ('number'):
              prevVal[elem] = Number(result[product])
              break
            case ('boolean'):
              prevVal[elem] = Boolean(result[product])
              break
            case ('array'):
              prevVal[elem] = Array(result[product])
              break
            default:
              prevVal[elem] = result[product]
          }

          if (optional) {
            const option = Object.values(optional)
            const [title, locale, currency] = option

            if (title === 'break') {
              prevVal[elem] = prevVal[elem].match(/.{2}/g)
              prevVal[elem].push(prevVal[elem].charAt(prevVal[elem].length - 1))
            } if (title === 'currency') {
              prevVal[elem] = Number(prevVal[elem]).toLocaleString(locale, { style: 'currency', currency })
            }

            return prevVal[elem]
          } else {
            return prevVal[elem]
          }
        } else {
          return (prevVal[elem] = {})
        }
      }, marketObject)

      arrayMarketObject.push(marketObject)
    })

    let assignMarketObject = {}

    arrayMarketObject.forEach(field => {
      assignMarketObject = assignObjectMarket(assignMarketObject, field)
    })

    return assignMarketObject
  }
}

function assignObjectMarket (MarketObj: object, ...values: Array<Object>) {
  if (!values.length) return MarketObj
  const value = values.shift()

  for (const index in value) {
    if (typeof value[index] === 'object') {
      if (!MarketObj[index]) {
        Object.assign(MarketObj, { [index]: {} })
      }
      assignObjectMarket(MarketObj[index], value[index])
    } else {
      Object.assign(MarketObj, { [index]: value[index] })
    }
  }

  return assignObjectMarket(MarketObj, ...values)
}

export default new ProductService()

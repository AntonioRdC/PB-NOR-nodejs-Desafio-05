import { PaginateResult } from 'mongoose'

import { IProductResponse, IProduct, IQueryGet } from '../interfaces/IProduct'
import ProductRepository from '../repository/ProductRepository'
import BadRequestError from '../errors/BadRequestError'

class ProductService {
  public async create (payload: IProduct): Promise<IProductResponse> {
    const result = await ProductRepository.create(payload)

    return result
  }

  public async get (payload: IQueryGet, page: number, limit: number): Promise<PaginateResult<IProductResponse>> {
    const result = await ProductRepository.get(payload, page, limit)

    if (result.totalCount === 0) {
      throw new BadRequestError('Not found products')
    }

    return result
  }
}

export default new ProductService()

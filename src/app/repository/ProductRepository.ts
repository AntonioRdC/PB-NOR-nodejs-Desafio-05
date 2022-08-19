import { PaginateResult } from 'mongoose'

import { IProduct, IProductResponse, IQueryGet } from '../interfaces/IProduct'
import ProductSchema from '../schema/ProductSchema'
import customLabels from '../../utils/customLabels'

class ProductRepository {
  public async create (payload: IProduct): Promise<IProductResponse> {
    return ProductSchema.create(payload)
  }

  public async get (payload: IQueryGet, page: number, limit: number): Promise<PaginateResult<IProductResponse>> {
    return ProductSchema.paginate({ $and: [payload, { stock_control_enabled: true }] },
      { page, customLabels, limit })
  }

  public async getById (id: string): Promise<IProductResponse | null> {
    return ProductSchema.findById(id)
  }
}

export default new ProductRepository()

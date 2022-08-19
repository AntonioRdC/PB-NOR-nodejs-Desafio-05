import { Request, Response } from 'express'

import ProductService from '../service/ProductService'
import DuplicateKeyError from '../errors/DuplicateKeyError'
import { IQueryGet } from '../interfaces/IProduct'

class ProductController {
  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body
      const result = await ProductService.create(body)

      return res.status(201).json(result)
    } catch (error) {
      if (error.code === 11000) {
        const nameError = Object.keys(error.keyValue)
        return res.status(400).json(DuplicateKeyError(nameError))
      }

      return res.status(500).json({ error })
    }
  }

  public async get (req: Request<{}, {}, {}, IQueryGet>, res: Response): Promise<Response> {
    try {
      const { page, limit, ...query } = req.query

      const result = await ProductService.get(query, page || 1, limit || 50)

      return res.status(200).json(result)
    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          message: error.name,
          details: error.message
        })
      }

      return res.status(500).json({ error })
    }
  }
}

export default new ProductController()

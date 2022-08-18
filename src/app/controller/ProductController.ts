import { Request, Response } from 'express'

import ProductService from '../service/ProductService'
import DuplicateKeyError from '../errors/DuplicateKeyError'

class ProductController {
  async create (req: Request, res: Response): Promise<Response> {
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
}

export default new ProductController()

import { Request, Response } from 'express'

import ProductService from '../service/ProductService'

class ProductController {
  async create (req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body
      const result = await ProductService.create(body)
      return res.status(201).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

export default new ProductController()

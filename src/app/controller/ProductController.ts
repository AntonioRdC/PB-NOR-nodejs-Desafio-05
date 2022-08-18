import { Request, Response } from 'express'

import ProductService from '../service/ProductService'

class ProductController {
  async create (req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body
      const result = await ProductService.create(body)
      return res.status(201).json(result)
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          message: 'DuplicateKeyError',
          details: `${Object.keys(error.keyValue)} must be unique`
        })
      }
      return res.status(500).json({ error })
    }
  }
}

export default new ProductController()

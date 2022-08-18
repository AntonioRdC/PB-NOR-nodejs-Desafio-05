import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required().trim(),
      description: Joi.string().required().trim(),
      department: Joi.string().required().trim(),
      bar_codes: Joi.string().required().trim().min(11).max(11),
      brand: Joi.string().required().trim(),
      price: Joi.number().required().min(0.01).max(1000),
      qtd_stock: Joi.number().required().min(1).max(100000).integer(),
      stock_control_enabled: Joi.boolean().forbidden()
    })

    const { error } = await schema.validate(req.body, { abortEarly: false })
    if (error) throw error
    return next()
  } catch (error) {
    return res.status(400).json(error)
  }
}

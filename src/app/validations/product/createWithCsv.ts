import { IProduct } from 'app/interfaces/IProduct'
import Joi from 'joi'

export default async (products: IProduct) => {
  const schema = Joi.object({
    title: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    department: Joi.string().required().trim(),
    bar_codes: Joi.string().required().trim().min(13).max(13),
    brand: Joi.string().required().trim(),
    price: Joi.number().required().min(0.01).max(1000),
    qtd_stock: Joi.number().required().min(1).max(100000).integer(),
    stock_control_enabled: Joi.boolean().forbidden()
  })

  const { error } = await schema.validateAsync(products, { abortEarly: false })

  return error
}

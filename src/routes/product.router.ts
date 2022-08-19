import { Router } from 'express'
import ProductController from '../app/controller/ProductController'
import createValidation from '../app/validations/product/create'
import getValidation from '../app/validations/product/get'

const router = Router()

router.post('/api/v1/product', createValidation, ProductController.create)
router.get('/api/v1/product', getValidation, ProductController.get)
router.get('/api/v1/product/:id', ProductController.getById)

export default router

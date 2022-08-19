import { Router } from 'express'
import ProductController from '../app/controller/ProductController'
import createValidation from '../app/validations/product/create'
import getValidation from '../app/validations/product/get'
import updatePutValidation from '../app/validations/product/updatePut'

const router = Router()

router.post('/api/v1/product', createValidation, ProductController.create)
router.get('/api/v1/product', getValidation, ProductController.get)
router.get('/api/v1/product/:id', ProductController.getById)
router.put('/api/v1/product/:id', updatePutValidation, ProductController.update)

export default router

import { Router } from 'express'
import ProductController from '../app/controller/ProductController'
import createValidation from '../app/validations/product/create'
import getValidation from '../app/validations/product/get'
import updatePutValidation from '../app/validations/product/updatePut'
import updatePatchValidation from '../app/validations/product/updatePatch'

const router = Router()

router.post('/api/v1/product', createValidation, ProductController.create)
router.get('/api/v1/product', getValidation, ProductController.get)
router.get('/api/v1/product/low_stock', getValidation, ProductController.getLowStock)
router.get('/api/v1/product/:id', ProductController.getById)
router.put('/api/v1/product/:id', updatePutValidation, ProductController.update)
router.patch('/api/v1/product/:id', updatePatchValidation, ProductController.update)
router.delete('/api/v1/product/:id', ProductController.delete)

export default router

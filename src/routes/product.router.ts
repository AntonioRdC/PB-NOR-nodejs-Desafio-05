import { Router } from 'express'
import multer from 'multer'
import ProductController from '../app/controller/ProductController'
import createValidation from '../app/middleware/validation/product/create'
import getValidation from '../app/middleware/validation/product/get'
import updatePutValidation from '../app/middleware/validation/product/updatePut'
import updatePatchValidation from '../app/middleware/validation/product/updatePatch'
import auth from '../app/middleware/auth'

const router = Router()
const multerConfig = multer()

router.post('/api/v1/product', auth, createValidation, ProductController.create)
router.post('/api/v1/product/csv', auth, multerConfig.single('csv'), ProductController.createWithCsv)
router.get('/api/v1/product', auth, getValidation, ProductController.get)
router.get('/api/v1/product/low_stock', auth, getValidation, ProductController.getLowStock)
router.get('/api/v1/product/:id', auth, ProductController.getById)
router.get('/api/v1/product/marketplace/:id', auth, ProductController.getMarketplace)
router.put('/api/v1/product/:id', auth, updatePutValidation, ProductController.update)
router.patch('/api/v1/product/:id', auth, updatePatchValidation, ProductController.update)
router.delete('/api/v1/product/:id', auth, ProductController.delete)

export default router

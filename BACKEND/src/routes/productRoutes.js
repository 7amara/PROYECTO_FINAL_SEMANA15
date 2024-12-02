import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controller/productController.js';
import {verifyToken, isAdmin} from '../middleware/authMiddleware.js'; 
import upload from '../utils/Multer.js'

const router = express.Router();

router.get('/', getProducts); 
router.get('/:id', getProductById);
router.post('/', upload, verifyToken, isAdmin, createProduct); 
router.put('/:id',upload, verifyToken, isAdmin, updateProduct); 
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

export default router;

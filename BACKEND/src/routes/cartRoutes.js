import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from '../controller/cartController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getCart);

router.post('/add', verifyToken, addToCart);

router.delete('/remove', verifyToken, removeFromCart);

router.delete('/clear', verifyToken, clearCart);

export default router;

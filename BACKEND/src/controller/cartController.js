import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { sequelize } from '../config/db/db.js';
import CartProduct from '../models/CartProduct.js';

export const getCart = async (req, res) => {
  try {
    const { userId } = req;

    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: Product,
        through: {
          attributes: ['quantity'],
        },
      },
    });

    if (!cart) {
      return res.json({ products: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito', error });
  }
};

export const addToCart = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { userId } = req;
    const { productId, quantity } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId }, { transaction });
    }

    const cartProduct = await CartProduct.findOne({
      where: { cartId: cart.id, productId },
    });

    if (cartProduct) {
      cartProduct.quantity += quantity;
      await cartProduct.save({ transaction });
    } else {
      await CartProduct.create(
        {
          cartId: cart.id,
          productId,
          quantity,
        },
        { transaction }
      );
    }

    await transaction.commit();
    res.json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: 'Error al agregar producto al carrito', error });
  }
};

export const removeFromCart = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { userId } = req;
    const { productId } = req.body;

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    const cartProduct = await CartProduct.findOne({
      where: { cartId: cart.id, productId },
    });

    if (!cartProduct) return res.status(404).json({ message: 'Producto no encontrado en el carrito' });

    await cartProduct.destroy({ transaction });
    await transaction.commit();
    res.json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: 'Error al eliminar producto del carrito', error });
  }
};

export const clearCart = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { userId } = req;

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    await CartProduct.destroy({ where: { cartId: cart.id }, transaction });

    await transaction.commit();
    res.json({ message: 'Carrito vaciado' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: 'Error al vaciar el carrito', error });
  }
};

import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db/db.js';
import Cart from './Cart.js';
import Product from './Product.js';

const CartProduct = sequelize.define(
  'CartProduct',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productId: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  });

Cart.belongsToMany(Product, { through: CartProduct, foreignKey: 'cartId' });
Product.belongsToMany(Cart, { through: CartProduct, foreignKey: 'productId' });

export default CartProduct;

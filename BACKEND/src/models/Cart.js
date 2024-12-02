import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db/db.js';
import Product from './Product.js';

const Cart = sequelize.define(
  'Cart',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

Cart.belongsToMany(
  Product, { through: 'CartProducts', foreignKey: 'cartId' });
Product.belongsToMany(Cart, { through: 'CartProducts', foreignKey: 'productId' });


export default Cart;

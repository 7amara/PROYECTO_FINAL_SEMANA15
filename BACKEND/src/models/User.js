import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db/db.js';
import Cart from './Cart.js'

const User = sequelize.define(
  'User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'Client'
  }
});

User.hasOne(Cart, { foreignKey: 'userId'});
Cart.belongsTo(User, { foreignKey: 'userId' });

export default User;

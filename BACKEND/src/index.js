import app from './config/server/server.js';
import { connectDB, sequelize } from './config/db/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();

  await sequelize.sync({ force: false });
  console.log('Modelos sincronizados con la base de datos.');

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();

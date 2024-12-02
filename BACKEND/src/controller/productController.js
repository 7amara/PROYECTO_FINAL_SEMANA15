import Product from '../models/Product.js';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Storage } from '../utils/Firebase.js';

export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { where: { category } } : {};
    const products = await Product.findAll(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, category, description, stock } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'Imagen requerida' });
  
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    const storageRef = ref(Storage, `img/products/${uniqueName}`);

    const metadata = { contentType: file.mimetype };

    await uploadBytes(storageRef, file.buffer, metadata);

    const imageUrl = await getDownloadURL(storageRef);

    const product = await Product.create({
      name,
      price,
      category,
      description,
      stock,
      imageUrl,
    });

    res.status(201).json({ message: 'Producto creado', product });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto', error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, price, category, description, stock, imageUrl } = req.body;
    
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    await product.update({
      name,
      price,
      category,
      description,
      stock,
      imageUrl,
    });

    res.json({ message: 'Producto actualizado', product });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto', error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    await product.destroy();
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error });
  }
};


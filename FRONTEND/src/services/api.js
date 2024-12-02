const BASE_URL = 'http://localhost:2000/api';

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  return await response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  return await response.json();
};

export const createProduct = async (productData, imageFile) => {
  const formData = new FormData();
  formData.append('name', productData.name);
  formData.append('price', productData.price);
  formData.append('category', productData.category);
  formData.append('description', productData.description);
  formData.append('stock', productData.stock);
  if (imageFile) formData.append('file', imageFile);

  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al crear el producto');
  }

  return response.json();
};

export const updateProduct = async (id, productData) => {
  const formData = new FormData();
  formData.append('name', productData.name);
  formData.append('price', productData.price);
  formData.append('category', productData.category);
  formData.append('description', productData.description);
  formData.append('stock', productData.stock);
  console.log('=== DATA "====>', formData);
  
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al editar el producto');
  }

  return await response.json();
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem('token');
  await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE', headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return await response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return await response.json();
};

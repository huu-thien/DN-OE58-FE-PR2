import http from 'src/utils/http';

const controller = new AbortController();

// Manage account
export const getOneAccount = (idAccount) => {
  return http.get(`users/${idAccount}`, { signal: controller.signal });
};

export const getListAccount = () => {
  return http.get('users', { signal: controller.signal });
};

export const deleteOneAccount = (idAccount) => {
  return http.delete(`users/${idAccount}`, { signal: controller.signal });
};

export const patchEditAccount = (body, idAccount) => {
  return http.patch(`users/${idAccount}`, body, { signal: controller.signal });
};

// Manage Product
export const getListProduct = () => {
  return http.get('products', { signal: controller.signal });
};
export const getOneProduct = (idProduct) => {
  return http.get(`products/${idProduct}`, { signal: controller.signal });
};

export const deleteOneProduct = (idProduct) => {
  return http.delete(`products/${idProduct}`, { signal: controller.signal });
};

export const patchEditProduct = (body, idProduct) => {
  return http.patch(`products/${idProduct}`, body, { signal: controller.signal });
};
export const postCreateProduct = (body) => {
  return http.post(`products`, body, { signal: controller.signal });
};

// Manage Renevue
export const getListOrder = () => {
  return http.get('orders', { signal: controller.signal });
};

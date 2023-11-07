import http from 'src/utils/http';

const controller = new AbortController();

export const postCreateOrder = (body) => {
  return http.post('orders', body, { signal: controller.signal });
};
export const getAllOrders = () => {
  return http.get('orders',  { signal: controller.signal });
}
export const getAllProduct = () => {
  return http.get('products',  { signal: controller.signal });
}

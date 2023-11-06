import http from 'src/utils/http';

export const productService = {
  getProducts: async (params) => {
    const response = await http.get('products', {
      params: { ...params }
    });
    return response.data;
  },
  getProductDetail: async (id) => {
    const { data } = await http.get(`products/${id}`);
    return data;
  }
};

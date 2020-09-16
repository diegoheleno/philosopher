import request from '@/utils/request';
import { Product } from '@/models/product';

const url = '/api/product';

export async function queryProduct() {
  return request(url, {});
}

export async function addProduct(params: Product) {
  return request(url, {
    method: 'POST',
    data: {
      params,
      method: 'post',
    },
  });
}

export async function updateProduct(params: Product) {
  return request(url, {
    method: 'POST',
    data: {
      params,
      method: 'update',
    },
  });
}

const service = {
  addProduct,
  queryProduct,
  updateProduct,
};

export default service;

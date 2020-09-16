import request from '@/utils/request';
import { Product } from '@/models/product';

let url = '/api/product';

export async function queryProductToApproval() {
  return request(url, {
  });
}

export async function queryProductToApprovalBySku(params: string) {
  return request(url + '?name=' + params, {
  });
}

// export async function removeProduct(params: { key: number[] }) {
//   return request(url, {
//     method: 'POST',
//     data: {
//       key: params.key,
//       method: 'delete',
//     },
//   });
// }

// export async function addProduct(params: Product) {
//   return request(url, {
//     method: 'POST',
//     data: {
//       params,
//       method: 'post',
//     },
//   });
// }

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
  updateProduct,
  queryProductToApproval,
  queryProductToApprovalBySku
};

export default service;

import request from '@/utils/request';
import { Seller } from '@/models/seller';

const url = '/api/seller';

export async function querySeller() {
  return request(url, {});
}

export async function querySellerByIdVtex(params: string) {
  return request(`${url}?id_seller_vtex=${params}`, {});
}

export async function removeSeller(params: { key: number[] }) {
  return request(url, {
    method: 'POST',
    data: {
      key: params.key,
      method: 'delete',
    },
  });
}

export async function addSeller(params: Seller) {
  return request(url, {
    method: 'POST',
    data: {
      params,
      method: 'post',
    },
  });
}

export async function updateSeller(params: Seller) {
  return request(url, {
    method: 'POST',
    data: {
      params,
      method: 'update',
    },
  });
}

const service = {
  addSeller,
  querySeller,
  removeSeller,
  updateSeller,
  querySellerByIdVtex,
};

export default service;

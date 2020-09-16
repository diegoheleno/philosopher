import request from '@/utils/request';
import Stage from '../../models/Stage';

const url = '/api/stage';

export async function get(params: number) {
  console.log(params)
  const teste = request(`${url}/${params}`, {});
  return teste
}

export async function last() {
  return request(`${url}/last`, {});
}

export async function next() {
  return request(`${url}/next`, {});
}

export async function save(params: Stage) {
  console.log(params)
  return request(url, {
    method: 'POST',
    data: {
      params
    },
  });
}

const service = {
  stage: {
    get, save, last, next
  }
};

export default service;

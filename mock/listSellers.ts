// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { SellerListParams } from '@/models/seller';
import { parse } from 'url';
import sellersDataSource from './seller';

let sellers = sellersDataSource.map((seller) => seller);

function getSeller(req: Request, res: Response, u: string) {

  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  // const { current = 1, pageSize = 10 } = req.query;
  // const params = (parse(realUrl, true).query as unknown) as TableListParams;

  const dataSource = [...sellers];
  // .slice(
  //   ((current as number) - 1) * (pageSize as number),
  //   (current as number) * (pageSize as number),
  // );

  // const sorter = JSON.parse(params.sorter as any);
  // if (sorter) {
  //   dataSource = dataSource.sort((prev, next) => {
  //     let sortNumber = 0;
  //     Object.keys(sorter).forEach((key) => {
  //       if (sorter[key] === 'descend') {
  //         if (prev[key] - next[key] > 0) {
  //           sortNumber += -1;
  //         } else {
  //           sortNumber += 1;
  //         }
  //         return;
  //       }
  //       if (prev[key] - next[key] > 0) {
  //         sortNumber += 1;
  //       } else {
  //         sortNumber += -1;
  //       }
  //     });
  //     return sortNumber;
  //   });
  // }
  // if (params.filter) {
  //   const filter = JSON.parse(params.filter as any) as {
  //     [key: string]: string[];
  //   };
  //   if (Object.keys(filter).length > 0) {
  //     dataSource = dataSource.filter((item) => {
  //       return Object.keys(filter).some((key) => {
  //         if (!filter[key]) {
  //           return true;
  //         }
  //         if (filter[key].includes(`${item[key]}`)) {
  //           return true;
  //         }
  //         return false;
  //       });
  //     });
  //   }
  // }

  // if (params.name) {
  //   dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
  // }
  // const result = {
  //   data: dataSource,
  //   total: sellers.length,
  //   success: true,
  //   pageSize,
  //   current: parseInt(`${params.currentPage}`, 10) || 1,
  // };
  // console.log('result: ', result)

  const params = (parse(realUrl, true).query as unknown) as SellerListParams;
  if (params.id_seller_vtex) {
    return res
      .status(200)
      .send(dataSource.filter((data) => data.id_seller_vtex.includes(params.id_seller_vtex || '')));
  }

  return res.status(200).send(dataSource);
}

function postSeller(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, sellerId, params } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      sellers = sellers.filter((item) => sellerId.indexOf(item.sellerId) === -1);
      break;
    case 'post':
      (() => {
        // const index = Math.ceil(Math.random() * 10000);
        // const newSeller = {
        //   sellerId: `marketplace${index}`,
        //   cnpj: `0000-0000-0000-${index}`,
        //   commission: index,
        //   company: `Corporação ${index}`,
        //   email: `empresa${index}@email.com`,
        //   fantasy: `Empresa ${index}`,
        //   name: `Empresa ${index} LTDA`,
        //   password: `${index}`,
        //   trademark: `Empresa ${index}`,
        //   trademarkId: `0000${index}`,
        //   user: `User ${index}`,
        // };
        sellers.unshift({ ...params, sellerId: uuidv4() });
        return res.json(params);
      })();
      return;

    case 'update':
      (() => {
        sellers = sellers.map((item) => {
          if (item.id_seller_vtex === params.id_seller_vtex) {
            const test = { ...item, ...params };
            return test;
          }
          return item;
        });
        return res.json(sellers);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: sellers,
    pagination: {
      total: sellers.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/seller': getSeller,
  'POST /api/seller': postSeller,
};

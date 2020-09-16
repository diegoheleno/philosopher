// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { ProductStatus } from '../src/models/product';
import productsDataSource from './product';

let products = productsDataSource.map((product) => product);

function getProduct(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  // const { current = 1, pageSize = 10 } = req.query;
  // const params = (parse(realUrl, true).query as unknown) as TableListParams;

  const dataSource = [...products];
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
  //   total: products.length,
  //   success: true,
  //   pageSize,
  //   current: parseInt(`${params.currentPage}`, 10) || 1,
  // };
  // console.log('result: ', result)
  return res.status(200).send(dataSource);
}

function postProduct(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, key, params } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      products = products.filter((item) => key.indexOf(item.id) === -1);
      break;
    case 'post':
      (() => {
        const index = Math.ceil(Math.random() * 10000);
        const newProduct = {
          id: `${index}`,
          accessories: `Accessories ${Math.ceil(Math.random() * 10000)}`,
          code: `${index}`,
          description: `Descrption ${index}`,
          height: Math.ceil(Math.random() * 10000),
          imageLabel: `Imagem ${index}`,
          imageName: `Imagem ${index}`,
          imageUrl: `Imagem ${index}`,
          keyword: `${Math.ceil(Math.random() * 10000)}`,
          kit: `${Math.ceil(Math.random() * 10000)}`,
          length: Math.ceil(Math.random() * 100),
          link: `${Math.ceil(Math.random() * 10000)}`,
          metatag: `${Math.ceil(Math.random() * 10000)}`,
          multiplierUnity: Math.ceil(Math.random() * 10000),
          name: `Produto ${index}`,
          sku: `${Math.ceil(Math.random() * 10000)}`,
          skuName: `SKU ${Math.ceil(Math.random() * 10000)}`,
          status: ProductStatus.Montage,
          unitMeasure: `${Math.ceil(Math.random() * 10000)}`,
          weight: Math.ceil(Math.random() * 10000),
          width: Math.ceil(Math.random() * 10000),
        };
        products.unshift(newProduct);
        return res.json(newProduct);
      })();
      return;

    case 'update':
      (() => {
        products = products.map((item) => {
          if (item.id === params.id) {
            return { ...item, ...params };
          }
          return item;
        });
        return res.json(products);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: products,
    pagination: {
      total: products.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/product': getProduct,
  'POST /api/product': postProduct,
};

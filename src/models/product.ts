import colors from './colors';

export enum ProductStatus {
  Analysis = 'Análise',
  Approved = 'Aprovado',
  Refused = 'Recusado',
  Montage = 'Montagem',
}

export const productStatusColor = {
  Analysis: colors.orange,
  Approved: colors.green,
  Refused: colors.red,
  Montage: colors.blue,
  Análise: colors.orange,
  Aprovado: colors.green,
  Recusado: colors.red,
  Montagem: colors.blue,
};

export interface Product {
  sku: string;
  skuName: string;
  height: number;
  width: number;
  length: number;
  weight: number;
  unitMeasure: string;
  multiplierUnity: number;
  id: string;
  name: string;
  code: string;
  link: string;
  description: string;
  keyword: string;
  metatag: string;
  kit: string;
  accessories: string;
  imageName: string;
  imageUrl: string;
  imageLabel: string;
  status: ProductStatus;
}

export const productDefaultValues: Product = {
  sku: '',
  skuName: '',
  height: 0,
  width: 0,
  length: 0,
  weight: 0,
  unitMeasure: '',
  multiplierUnity: 0,
  id: '',
  name: '',
  code: '',
  link: '',
  description: '',
  keyword: '',
  metatag: '',
  kit: '',
  accessories: '',
  imageName: '',
  imageUrl: '',
  imageLabel: '',
  status: ProductStatus.Montage,
};

export const productLabel = {
  sku: 'SKU',
  skuName: 'SKU Nome',
  height: 'Altura',
  width: 'Largura',
  length: 'Tamanho',
  weight: 'Peso',
  unitMeasure: 'Unidade de Medida',
  multiplierUnity: 'Multiplicador',
  id: 'ID',
  name: 'Nome',
  code: 'Código',
  link: 'Link',
  description: 'Descrição',
  keyword: 'Palavra-Chave',
  metatag: 'Metatag',
  kit: 'Kit',
  accessories: 'Acessórios',
  imageName: 'Nome da Imagem',
  imageUrl: 'Url da Imagem',
  imageLabel: 'Label da Iamgem',
  status: 'Status do Produto',
};

// export const productRender = (product: Product) => ({
//   height: product.,
//   width: product.,
//   weight: product.,
// })

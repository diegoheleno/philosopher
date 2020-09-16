import { v4 as uuidv4 } from 'uuid';
import imagens from './imagem';
import { Product, ProductStatus } from '../src/models/product';

const createMock = (index: number): Product => {
  return {
    id: uuidv4(),
    accessories: `acessório, acessório, acessório, acessório, acessório`,
    code: Math.ceil(Math.random() * 100000000).toString(),
    description: `Este é a descrição do produto`,
    height: Math.ceil(Math.random() * 200),
    imageLabel: `Label da Imagem ${index}`,
    imageName: `Nome da Imagem ${index}`,
    imageUrl: imagens[index % 5],
    keyword: `${index}`,
    kit: `${index}`,
    length: Math.ceil(Math.random() * 200),
    link: `${index}`,
    metatag: `${index}`,
    multiplierUnity: Math.ceil(Math.random() * 5),
    name: `Produto ${index}`,
    sku: uuidv4(),
    skuName: `SKU ${index}`,
    status: ProductStatus.Analysis,
    unitMeasure: `UN`,
    weight: Math.ceil(Math.random() * 50),
    width: Math.ceil(Math.random() * 200),
  };
};

export default Array.from(Array(100), (_, i) => i + 1).map((index) => createMock(index));

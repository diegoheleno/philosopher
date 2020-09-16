import { v4 as uuidv4 } from 'uuid';
import { Seller } from '../src/models/seller';

const createMock = (index: number): Seller => {
  return {
    sellerId: uuidv4(),
    id_seller_vtex: `marketplace${index}`,
    cnpj: `0000-0000-0000-${index}`,
    commission: index,
    company: `Corporação ${index}`,
    email: `empresa${index}@email.com`,
    fantasy: `Empresa ${index}`,
    name: `Empresa ${index} LTDA`,
    password: `${index}`,
    trademark: `Empresa ${index}`,
    trademarkId: `0000${index}`,
    user: `User ${index}`,
  };
};

export default Array.from(Array(20), (_, i) => i + 1).map((index) => createMock(index));

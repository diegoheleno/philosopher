export interface Seller {
  sellerId: string;
  id_seller_vtex: string;
  company: string;
  cnpj: string;
  name: string;
  fantasy: string;
  email: string;
  trademark: string;
  trademarkId: string;
  user: string;
  password: string;
  commission: number;
}

export interface SellerListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface SellerListData {
  list: Seller[];
  pagination: Partial<SellerListPagination>;
}

export interface SellerListParams {
  id_seller_vtex?: string;
  seller?: Seller;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

export const sellerDefaultValues = {
  sellerId: '',
  id_seller_vtex: '',
  company: '',
  cnpj: '',
  name: '',
  fantasy: '',
  email: '',
  trademark: '',
  trademarkId: '',
  user: '',
  password: '',
  commission: 0,
};

export const sellerLabel = {
  sellerId: 'Seller ID',
  id_seller_vtex: 'ID Seller Vtex',
  company: 'Razão Social',
  cnpj: 'CNPJ',
  name: 'Nome do Seller',
  fantasy: 'Nome Fantasia',
  email: 'Email',
  trademark: 'Marca',
  trademarkId: 'Marca ID',
  user: 'Usuário',
  password: 'Senha',
  commission: 'Comissão',
};

export const sellerEnableEdit = {
  sellerId: false,
  id_seller_vtex: false,
  company: false,
  cnpj: false,
  name: false,
  fantasy: false,
  email: false,
  trademark: false,
  trademarkId: false,
  user: false,
  password: false,
  commission: true,
};

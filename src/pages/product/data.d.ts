import { Effect, Reducer } from 'umi';
import { Product } from '@/models/product';

export const namespace = 'productModel';

export interface ProductState {
  products?: Product[];
}

export interface ProductModel {
  namespace: string;
  state: ProductState;
  effects: {
    init: Effect;
    addProduct: Effect;
    queryProduct: Effect;
    updateProduct: Effect;
  };
  reducers: { save: Reducer<ProductState> };
}

export interface CurrentUser {
  userid: string;
  userName: string;
  userEmail: string;
  rubric?: string;
}

export enum ProductEffect {
  Init = 'init',
  AddProduct = 'addProduct',
  UpdateProduct = 'updateProduct',
  QueryProduct = 'queryProduct',
  QueryProductToApproval = 'queryProductToApproval',
  QueryProductToApprovalBySku = 'queryProductToApprovalBySku',
}

export enum ProductReducer {
  Save = 'save',
}

export enum ProductDispatch {
  Init = `${namespace}/${ProductEffect.Init}`,
  AddProduct = `${namespace}/${ProductEffect.AddProduct}`,
  UpdateProduct = `${namespace}/${ProductEffect.UpdateProduct}`,
  QueryProduct = `${namespace}/${ProductEffect.QueryProduct}`,
  QueryProductToApproval = `${namespace}/${ProductEffect.QueryProductToApproval}`,
  QueryProductToApprovalBySku = `${namespace}/${ProductEffect.QueryProductToApprovalBySku}`,
  Save = `${namespace}/${ProductReducer.Save}`,
}

export const dispatcherFactory = (dispatch: any) => {
  return {
    addProduct: (product: Product) => {
      dispatch({
        type: ProductDispatch.AddProduct,
        payload: product,
      });
    },
    updateProduct: (product: Product) => {
      dispatch({
        type: ProductDispatch.UpdateProduct,
        payload: product,
      });
    },
    queryProduct: () => {
      dispatch({
        type: ProductDispatch.QueryProduct,
      });
    },
    queryProductToApproval: () => {
      dispatch({
        type: ProductDispatch.QueryProductToApproval,
      });
    },
    queryProductToApprovalBySku: () => {
      dispatch({
        type: ProductDispatch.QueryProductToApprovalBySku,
      });
    },
  };
};

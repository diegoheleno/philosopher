import { Effect, Reducer } from 'umi';
import { Seller } from '@/models/seller';

export const namespace = 'sellerModel';

export interface SellerState {
  sellers?: Seller[];
}

export interface SellerModel {
  namespace: string;
  state: SellerState;
  effects: {
    init: Effect;
    addSeller: Effect;
    querySeller: Effect;
    querySellerByIdVtex: Effect;
    removeSeller: Effect;
    updateSeller: Effect;
  };
  reducers: { save: Reducer<SellerState> };
}

export interface CurrentUser {
  userid: string;
  userName: string;
  userEmail: string;
  rubric?: string;
}

export enum SellerEffect {
  Init = 'init',
  AddSeller = 'addSeller',
  QuerySeller = 'querySeller',
  RemoveSeller = 'removeSeller',
  UpdateSeller = 'updateSeller',
  QuerySellerByIdVtex = 'querySellerByIdVtex',
}

export enum SellerReducer {
  Save = 'save',
}

export enum SellerDispatch {
  Init = `${namespace}/${SellerEffect.Init}`,
  QuerySellerByIdVtex = `${namespace}/${SellerEffect.QuerySellerByIdVtex}`,
  AddSeller = `${namespace}/${SellerEffect.AddSeller}`,
  QuerySeller = `${namespace}/${SellerEffect.QuerySeller}`,
  RemoveSeller = `${namespace}/${SellerEffect.RemoveSeller}`,
  UpdateSeller = `${namespace}/${SellerEffect.UpdateSeller}`,
  Save = `${namespace}/${SellerReducer.Save}`,
}

export const dispatcherFactory = (dispatch: any) => {
  return {
    addSeller: (seller: Seller) => {
      dispatch({
        type: SellerDispatch.AddSeller,
        payload: seller,
      });
    },
    querySeller: () => {
      dispatch({
        type: SellerDispatch.QuerySeller,
      });
    },
    removeSeller: (id_seller_vtex: string) => {
      dispatch({
        type: SellerDispatch.RemoveSeller,
        payload: id_seller_vtex,
      });
    },
    updateSeller: (seller: Seller) => {
      dispatch({
        type: SellerDispatch.UpdateSeller,
        payload: seller,
      });
    },
  };
};

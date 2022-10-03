import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import * as types from './ActionType';

export const getdata = (params) => (dispatch) => {
  dispatch({ type: types.GET_DATA_REQUEST });
  return axios
    .get('https://json-mini-project.herokuapp.com/data', params)
    .then((res) =>
      dispatch({ type: types.GET_DATA_SUCCESS, payload: res.data })
    )
    .catch((err) => dispatch({ type: types.GET_DATA_FAILURE(err) }));
};

// single product

export const singleproduct = (id) => (dispatch) => {
  type({ type: types.SINGLE_PRODUCT_REQUEST });
  return axios
    .get(`https://json-mini-project.herokuapp.com/data/${id}`)
    .then((res) =>
      dispatch({ type: types.SINGLE_PRODUCT_SUCCESS, payload: res.data })
    )
    .catch((err) => dispatch({ type: types.SINGLE_PRODUCT_FAILURE }));
};

// addto cart

export const AddtoCart = (payload) => (dispatch) => {
  dispatch({ type: types.ADDTO_CART_REQUEST });
  return axios
    .post('https://json-mini-project.herokuapp.com/cart', payload)
    .then((res) =>
      dispatch({ type: types.ADDTO_CART_SUCCESS, payload: res.data })
    )
    .catch((err) => dispatch({ type: types.ADDTO_CART_FAILURE }));
};

// INCREASE QTY
export const addItem = (payload) => {
  return {
    type: types.INCREASE_QTY,
    payload,
  };
};

// DECREASE QTY
export const removeItem = (payload) => {
  return {
    type: types.DECREASE_QTY,
    payload,
  };
};

export const deleteCartItem = (payload) => {
  return {
    type: types.REMOVE_FROM_CART,
    payload,
  };
};

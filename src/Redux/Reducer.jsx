import { loadData, saveData } from '../utils/LocalStorage';
import * as types from './ActionType';

const initState = {
  isLoading: false,
  isError: false,
  data: [],
  currentProduct: {},
  cart: [],
};

var cartitem = loadData('cartItems') || [];
// console.log('cart:', cart);

export const reducer = (state = initState, { type, payload }) => {
  const product = payload;

  switch (type) {
    case types.GET_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case types.GET_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload,
      };
    case types.GET_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    // single**********************

    case types.SINGLE_PRODUCT_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case types.SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        currentProduct: payload,
      };
    case types.SINGLE_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    // addto cart***********************

    case types.ADDTO_CART_SUCCESS:
      // let check cart same product is present in cart or not
      const isPresent = state.cart.find((prod) => {
        return prod.id === payload.id;
      });

      // if its present increase qty
      let newcart;
      if (isPresent) {
        let newcart = state.cart.map((prod) => {
          // console.log('newcart:', newcart)

          if (prod.id === payload.id) {
            console.log('prod:', prod);

            return { ...prod, qty: prod.qty + 1 };
          } else {
            return prod;
          }
        });
      } else {
        let newPayload = {
          ...payload,
          qty: 1,
        };
        newcart = [...state.cart, newPayload];
      }
      return { ...state, cart: newcart };

    //************ increase  and desc  qty */
    case types.INCREASE_QTY:
      let modifiedcart = state.cart.map((prod) => {
        // console.log('newcart:', newcart)

        if (prod.id === payload.id) {
          console.log('prod:', prod);

          return { ...prod, qty: prod.qty + 1 };
        } else {
          return prod;
        }
      });

      return { ...state, cart: modifiedcart };

    case types.DECREASE_QTY:
      let decCart = state.cart.map((prod) => {
        // console.log('newcart:', newcart)

        if (prod.id === payload.id) {
          console.log('prod:', prod);

          return { ...prod, qty: prod.qty - 1 };
        } else {
          return prod;
        }
      });

      return { ...state, cart: decCart };
    //Remove cart

    case types.REMOVE_FROM_CART:
      let updatedcart = state.cart.filter((prod) => {
        return !(prod.id === payload.id);
      });
      return { ...state, cart: updatedcart };
    default:
      return { ...state };
  }
};

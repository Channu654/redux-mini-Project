import { loadData, saveData } from '../utils/LocalStorage';
import * as types from './ActionType';

const cart = loadData('cartItems') || [];

const cartreducer = (state = cart, action) => {
  console.log('cartreducer:', cartreducer)
  const product = action.payload;
  switch (action.type) {
    case types.ADD_ITEM: {
      const updatedData = [...state, { ...product, qty: 1 }];

      const exist = state.find((x) => x.id === product.id);
      if (!exist) {
        saveData('cartItems', updatedData);
      }

      if (exist) {
        return state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        // const product = action.payload;
        return updatedData;
      }
    }
    case types.DEL_ITEM:
      const exist1 = state.find((x) => x.id === product.id);
      if (exist1.qty === 1) {
        const updatedDate1 = state.filter((x) => x.id !== exist1.id);
        saveData('cartItems', updatedDate1);
        return updatedDate1;
      } else {
        return state.map((x) => {
          return x.id === product.id ? { ...x, qty: x.qty - 1 } : x;
        });
      }
    default:
      return state;
  }
};
export default cartreducer;

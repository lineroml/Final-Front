import { createContext, useContext, useReducer } from 'react';

export const Cart = createContext();

// Initial state
const username = JSON.parse(sessionStorage.getItem('token'))?.username || null;
let initialItems = [];
if (username) {
  const cart = sessionStorage.getItem('cart');
  if (cart) {
    const { owner } = JSON.parse(cart);
    if (owner === username) {
      initialItems = JSON.parse(cart).items;
    } else {
      localStorage.removeItem('cart');
    }
  }
} else {
  sessionStorage.removeItem('cart');
}

// persister
function persistData(data) {
  sessionStorage.setItem('cart', JSON.stringify({ items: data, owner: username }));
}

// Actions
export const ADD_ITEM = 'ADD_ITEM';
export const SET_AMOUNT_OF_ITEM = 'SET_AMOUNT_OF_ITEM';
export const REMOVE_ONEOF_ITEM = 'REMOVE_ONEOF_ITEM';
export const REMOVE_ALLOF_ITEM = 'REMOVE_ALLOF_ITEM';
export const CLEAR_ALL = 'CLEAR_ALL';

// Action creators
export function addItem(item) {
  return { type: ADD_ITEM, item };
}

export function removeOneItem(id) {
  return { type: REMOVE_ONEOF_ITEM, id };
}

export function removeAllOfItem(id) {
  return { type: REMOVE_ALLOF_ITEM, id };
}

export function setAmountOfItem(id, amount) {
  return { type: SET_AMOUNT_OF_ITEM, id, amount };
}

export function clearAll() {
  return { type: CLEAR_ALL };
}

// Reducer
export function cartReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM:
      const newItem = { ...action.item, count: 1 };
      persistData([...state, newItem]);
      return [...state, newItem];

    case REMOVE_ONEOF_ITEM:
      const copy = [...state];
      const index = copy.findIndex((item) => item.id === action.id);
      copy[index].count--;
      if (copy[index].count === 0) {
        copy.splice(index, 1);
      }
      persistData(copy);
      return copy;

    case REMOVE_ALLOF_ITEM:
      return state.filter((item) => item.id !== action.id);

    case SET_AMOUNT_OF_ITEM:
      const copy2 = [...state];
      const index2 = copy2.findIndex((item) => item.id === action.id);
      copy2[index2].count = action.amount;
      persistData(copy2);
      return copy2;

    case CLEAR_ALL:
      persistData([]);
      return [];

    default:
      persistData(state);
      return state;
  }
}

function CartProvider(props) {
  const [items, dispatch] = useReducer(cartReducer, initialItems);

  const itemData = { items, dispatch };

  return <Cart.Provider value={itemData} {...props} />;
}

function useCart() {
  return useContext(Cart);
}

export { CartProvider, useCart };

import React, { createContext, useContext, useReducer } from 'react';

export const ItemStore = createContext();

// Initial state
const initialItems = JSON.parse(localStorage.getItem('items')) || [
  {
    id: 1,
    name: 'Disney Mystery Box',
    price: '200.00',
    picture_url:
      'https://ae01.alicdn.com/kf/H53d4096d3b1c4efd9d4115c36659ddadT/Mystery-Box-Disney-Lucky-Product-Random-Blind-Box-Diamond-Painting-Connotation-5000-Random-Varieties-Full-Square.jpg_Q90.jpg_.webp',
    rating: 4,
  },
  {
    id: 2,
    name: 'Gaming Mystery Box',
    price: '120.00',
    picture_url:
      'https://i0.wp.com/nextlevelgamingstore.com/wp-content/uploads/2021/05/mystery-25.jpeg?fit=1280%2C1280&ssl=1',
    rating: 5,
  },
  {
    id: 3,
    name: 'Anime Mystery Box',
    price: '150.00',
    picture_url:
      'https://images.squarespace-cdn.com/content/v1/60d3e189e7fce510d202d8a9/1632567399309-OOMOMRGLWGOSO12N73XV/1.png?format=500w',
    rating: 5,
  },
  {
    id: 4,
    name: 'Vegan Snack Mystery Box',
    price: '170.00',
    picture_url: 'https://m.media-amazon.com/images/I/814v0Wze5eL._AC_SX425_.jpg',
    rating: 3,
  },
  {
    id: 5,
    name: 'Funko Pop Mystery Box',
    price: '350.00',
    picture_url:
      'https://i5.walmartimages.com/asr/fb99a4a3-9712-4802-97b2-b8ed3f10eca5_1.7f38622cd692f2dd1ca4a30d99eff123.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    rating: 4,
  },
  {
    id: 6,
    name: 'Pokemon Mystery Box',
    price: '230.00',
    picture_url:
      'https://cdn.shopify.com/s/files/1/0267/4576/6073/products/CopyofUntitled_3_700x700.png?v=1621330064',
    rating: 1,
  },
  {
    id: 7,
    name: 'Mario Mystery Box',
    price: '250.00',
    picture_url: 'https://m.media-amazon.com/images/I/71YU3cPFvYL._AC_SL1266_.jpg',
    rating: 5,
  },
];

// Persister
function persistData(data) {
  localStorage.setItem('items', JSON.stringify(data));
}

// Actions
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CLEAR_ALL = 'CLEAR_ALL';

// Action creators
export function addItem(item) {
  return { type: ADD_ITEM, item };
}

export function updateItem(id, newItem) {
  return { type: UPDATE_ITEM, id, newItem };
}

export function removeItem(id) {
  return { type: REMOVE_ITEM, id };
}

export function clearAll() {
  return { type: CLEAR_ALL };
}

// Reducer
export function itemReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM:
      // find max id in state
      const maxId = Math.max(...state.map((item) => item.id));
      const newItem = { ...action.item, id: maxId + 1 };
      persistData([...state, newItem]);
      return [...state, newItem];

    case UPDATE_ITEM:
      const updatedItem = { ...state.find((item) => item.id === action.id), ...action.newItem };
      persistData(state.map((item) => (item.id === action.id ? updatedItem : item)));
      return state.map((item) => (item.id === action.id ? updatedItem : item));

    case REMOVE_ITEM:
      const copy = [...state];
      // Remove element of array whose id is equal to action.id
      persistData(copy.filter((item) => item.id !== action.id));
      return copy.filter((item) => item.id !== action.id);
    case CLEAR_ALL:
      persistData([]);
      return [];
    default:
      return state;
  }
}

function ItemProvider(props) {
  const [items, dispatch] = useReducer(itemReducer, initialItems);

  const itemData = { items, dispatch };

  return <ItemStore.Provider value={itemData} {...props} />;
}

function useItemStore() {
  return useContext(ItemStore);
}

export { ItemProvider, useItemStore };

import React, { createContext, useContext, useReducer } from 'react';

export const ItemStore = createContext();

// Initial state
const initialItems = ['Extract todo state to todo context', 'Implement todo provider'];

// Actions
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CLEAR_ALL = 'CLEAR_ALL';

// Action creators
export function addItem(text) {
  return { type: ADD_ITEM, text };
}

export function removeItem(index) {
  return { type: REMOVE_ITEM, index };
}

export function clearAll() {
  return { type: CLEAR_ALL };
}

// Reducer
export function itemReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.text];
    case REMOVE_ITEM:
      const copy = [...state];
      copy.splice(action.index, 1);
      return copy;
    case CLEAR_ALL:
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

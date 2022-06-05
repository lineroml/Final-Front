import React, { createContext, useContext, useReducer } from 'react';

export const UserStore = createContext();

// Initial state
const initialItems = [
  {
    name: 'John',
    lastName: 'Doe',
    username: 'admin',
    password: 'admin',
    role: 'admin',
    mail: 'admin@admin.com',
  },
  {
    name: 'John',
    lastName: 'Doe',
    username: 'admin2',
    password: 'admin2',
    role: 'admin',
    mail: 'admin2@admin.com',
  },
];

// Actions
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const CLEAR_ALL = 'CLEAR_ALL';

// Action creators
export function addUser(text) {
  return { type: ADD_USER, text };
}

export function removeUser(index) {
  return { type: REMOVE_USER, index };
}

export function clearAll() {
  return { type: CLEAR_ALL };
}

// Reducer
export function userReducer(state, action) {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.text];
    case REMOVE_USER:
      const copy = [...state];
      copy.splice(action.index, 1);
      return copy;
    case CLEAR_ALL:
      return [];
    default:
      return state;
  }
}

function UserProvider(props) {
  const [users, dispatch] = useReducer(userReducer, initialItems);

  const userData = { users, dispatch };

  return <UserStore.Provider value={userData} {...props} />;
}

function useUserStore() {
  return useContext(UserStore);
}

export { UserProvider, useUserStore };

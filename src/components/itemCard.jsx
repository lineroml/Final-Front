import React, { useEffect } from 'react';
import Ratings from './ratings';
import { useCart, addItem, removeAllOfItem } from '../hooks/useCart';
import useLoginToken from '../hooks/useLoginToken';

function ItemCard({ product }) {
  const { items, dispatch } = useCart();
  const { token } = useLoginToken();

  const isInCart = () => {
    return items.find((item) => item.id === product.id);
  };

  const handleAddToCart = () => {
    if (token) {
      dispatch(addItem(product));
    } else {
      alert('You must be logged in to add items to your cart');
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeAllOfItem(product.id));
  };

  return (
    <>
      <div class='sm:w-1/3 w-full max-w-sm bg-white rounded-lg shadow-xl mt-4 mx-3'>
        <img
          class='p-8 rounded-t-lg object-contain w-full aspect-square h-auto'
          src={product.picture_url}
          alt='product image'
        />
        <div class='px-5 pb-5'>
          <h5 class='text-xl font-semibold tracking-tight text-gray-900 truncate'>
            {product.name}
          </h5>
          <Ratings rating={product.rating}></Ratings>
          <div class='flex justify-between items-center'>
            <span class='sm:text-3xl text-2xl font-bold text-gray-900'>${product.price}</span>
            {!isInCart() ? (
              <button
                class='text-white bg-main-orange hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:px-5 px-3 py-2.5 text-center'
                onClick={handleAddToCart}
              >
                Agregar a carrito
              </button>
            ) : (
              <button
                class='text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                onClick={handleRemoveFromCart}
              >
                Quitar de Carrito
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemCard;

import React from 'react';
import Ratings from './ratings';

function ItemCard({ product }) {
  return (
    <>
      <div class='w-1/3 max-w-sm bg-white rounded-lg shadow-xl mt-4 mx-3'>
        <a href='#'>
          <img
            class='p-8 rounded-t-lg object-cover w-full aspect-square h-auto'
            src={product.picture_url}
            alt='product image'
          />
        </a>
        <div class='px-5 pb-5'>
          <a href='#'>
            <h5 class='text-xl font-semibold tracking-tight text-gray-900 truncate'>
              {product.name}
            </h5>
          </a>
          <Ratings rating={product.rating}></Ratings>
          <div class='flex justify-between items-center'>
            <span class='text-3xl font-bold text-gray-900'>${product.price}</span>
            <button class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
              Agregar a carrito
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemCard;

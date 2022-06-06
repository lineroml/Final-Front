import React from 'react';

function CheckoutItem({ item }) {
  return (
    <li class='grid grid-cols-6 gap-2 border-b-1'>
      <div class='col-span-1 self-center'>
        <img src={item.picture_url} alt='Product' class='rounded w-full' />
      </div>
      <div class='flex flex-col col-span-3 pt-2'>
        <span class='text-gray-600 text-md font-semi-bold'>{item.name}</span>
      </div>
      <div class='col-span-2 pt-3'>
        <div class='flex items-center space-x-2 text-sm justify-between'>
          <span class='text-gray-400'>
            {item.count} x ${item.price}
          </span>
          <span class='text-pink-400 font-semibold inline-block'>
            ${parseFloat(item.price * item.count).toFixed(2)}
          </span>
        </div>
      </div>
    </li>
  );
}

export default CheckoutItem;

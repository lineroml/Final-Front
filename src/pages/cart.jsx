import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';
import { useCart } from '../hooks/useCart';
import CartListItem from '../components/cartListItem';

function Cart() {
  const { items } = useCart();
  const [shippingCost, setShippingCost] = useState(10.0);

  const getItemSubTotal = (item) => {
    return item.price * item.count;
  };

  const getTotal = () => {
    return parseFloat(items.reduce((total, item) => total + getItemSubTotal(item), 0)).toFixed(2);
  };

  const handleShippingCostChange = (event) => {
    const { value } = event.target;
    setShippingCost(parseFloat(value));
  };
  return (
    <Layout>
      <div className='container mx-auto sm:mt-10'>
        <div className='flex flex-wrap shadow-xl my-10'>
          <div className='sm:w-3/4 w-full bg-white sm:px-10 px-5 py-10'>
            <div className='flex justify-between border-b pb-8'>
              <h1 className='font-semibold text-2xl text-center'>Carrito de compras</h1>
              <h2 className='font-semibold text-2xl text-center'>{items.length} Items</h2>
            </div>
            <div className='flex mt-10 mb-5'>
              <h3 className='font-semibold text-gray-600 text-xs uppercase w-2/5'>Producto</h3>
              <h3 className='font-semibold text-center text-gray-600 text-xs uppercase sm:w-1/5 w-2/5'>
                Cantidad
              </h3>
              <h3 className='sm:flex hidden font-semibold text-center text-gray-600 text-xs uppercase w-1/5'>
                Precio
              </h3>
              <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5'>
                Total
              </h3>
            </div>
            {items.length > 0 ? (
              items.map((item) => <CartListItem item={item} />)
            ) : (
              <div className='flex justify-center items-center mt-10 text-center'>
                <h1 className='text-gray-600 text-5xl text-center'>
                  No hay productos en el carrito :c
                </h1>
              </div>
            )}
            <a href='#' className='flex font-semibold text-indigo-600 text-sm mt-10'>
              <svg className='fill-current mr-2 text-indigo-600 w-4' viewBox='0 0 448 512'>
                <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
              </svg>
              Volver a la tienda
            </a>
          </div>

          <div id='summary' className='sm:w-1/4 w-full px-8 py-10'>
            <h1 className='font-semibold text-2xl border-b pb-8'>Resumen de la orden</h1>
            <div className='flex justify-between mt-10 mb-5'>
              <span className='font-semibold text-sm uppercase'>Items {items.length}</span>
              <span className='font-semibold text-sm'>${getTotal()}</span>
            </div>
            {items.length > 0 && (
              <>
                <div>
                  <label className='font-medium inline-block mb-3 text-sm uppercase'>Envío</label>
                  <select
                    className='block p-2 text-gray-600 w-full text-sm'
                    onChange={handleShippingCostChange}
                  >
                    <option value={10}>Envío Estándar - $10.00</option>
                  </select>
                </div>
                <div className='border-t mt-8'>
                  <div className='flex font-semibold justify-between py-6 text-sm uppercase'>
                    <span>Costo total</span>
                    <span>${parseFloat(parseFloat(getTotal()) + shippingCost).toFixed(2)}</span>
                  </div>
                  <Link to='/checkout'>
                    <button className='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full'>
                      Checkout
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;

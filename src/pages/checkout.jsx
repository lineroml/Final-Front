import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { useCart, clearAll } from '../hooks/useCart';
import useFormData from '../hooks/useFormData';
import CheckoutItem from '../components/checkoutItem';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { items, dispatch } = useCart();
  const { form, formData, updateFormData } = useFormData(null);
  const [showErrors, setShowErrors] = useState(false);
  const navigate = useNavigate();
  const getTotal = () => {
    return parseFloat(items.reduce((total, item) => total + item.price * item.count, 0)).toFixed(2);
  };

  const errorOnName = () => {
    console.log(showErrors, formData.name);
    if (showErrors && !formData.name) {
      return 'border-red-500';
    } else {
      return '';
    }
  };

  const errorOnEmail = () => {
    if (
      showErrors &&
      (!formData.email || !formData.email?.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))
    ) {
      return 'border-red-500';
    } else {
      return '';
    }
  };

  const errorOnAddress = () => {
    if (showErrors && !formData.direccion) {
      return 'border-red-500';
    } else {
      return '';
    }
  };

  const errorOnCity = () => {
    if (showErrors && !formData.ciudad) {
      return 'border-red-500';
    } else {
      return '';
    }
  };

  const errorOnDept = () => {
    if (showErrors && !formData.depto) {
      return 'border-red-500';
    } else {
      return '';
    }
  };

  const errorOnZip = () => {
    if (showErrors && (!formData.codigo_postal || !formData.codigo_postal?.match(/^\d{6}$/))) {
      return 'border-red-500';
    } else {
      return '';
    }
  };

  const errorOnCard = () => {
    if (showErrors && (!formData.card || !formData.card?.match(/^\d{16}$/))) {
      return 'border-red-500';
    } else {
      return '';
    }
  };

  const errorOnExp = () => {
    if (showErrors && (!formData.thru || !formData.thru?.match(/^\d{2}\/\d{2}$/))) {
      return 'border-red-500';
    } else {
      return '';
    }
  };

  const errorOnCvv = () => {
    if (showErrors && (!formData.cvv || !formData.cvv?.match(/^\d{3}$/))) {
      return 'border-red-500';
    } else {
      return '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    if (Object.keys(formData).length === 0) {
      setShowErrors(true);
      return;
    }

    if (
      !errorOnName() &&
      !errorOnEmail() &&
      !errorOnAddress() &&
      !errorOnCity() &&
      !errorOnDept() &&
      !errorOnZip() &&
      !errorOnCard() &&
      !errorOnExp() &&
      !errorOnCvv()
    ) {
      setShowErrors(false);
      dispatch(clearAll());
      navigate('/success');
    } else {
      setShowErrors(true);
    }
  };

  return (
    <Layout>
      <div className='h-screen grid grid-cols-3 shadow-xl'>
        <div className='lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12'>
          <div className='mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md'>
            <div className='flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0'>
              <div className='text-yellow-500'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 sm:w-5 h-6 sm:h-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div className='text-sm font-medium ml-3'>Checkout</div>
            </div>
            <div className='text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4'>
              Por favor ingresa tus datos abajo para completar tu compra.
            </div>
          </div>
          <form ref={form} onChange={updateFormData} onSubmit={handleSubmit}>
            <div className='rounded-md'>
              <section>
                <h2 className='uppercase tracking-wide text-lg font-semibold text-gray-700 my-2'>
                  Información de Facturación y Envío
                </h2>
                <div className='mb-3 bg-red-200 shadow-lg rounded text-gray-600'>
                  <label className={`flex w-full border h-12 py-3 items-center ${errorOnName()}`}>
                    <span className='text-right px-2'>Nombre</span>
                    <input
                      name='name'
                      className='focus:outline-none px-3'
                      placeholder='John Doe'
                      required=''
                    />
                  </label>
                  <label className={`flex border h-12 py-3 items-center ${errorOnEmail()}`}>
                    <span className='text-right px-2'>Email</span>
                    <input
                      name='email'
                      type='email'
                      className='focus:outline-none px-3'
                      placeholder='john.doe@email.com'
                      required=''
                    />
                  </label>
                  <label className={`flex border h-12 py-3 items-center ${errorOnAddress()}`}>
                    <span className='text-right px-2'>Dirección</span>
                    <input
                      name='direccion'
                      className='focus:outline-none px-3'
                      placeholder='Cra. 123 #123-123'
                    />
                  </label>
                  <label className={`flex border h-12 py-3 items-center ${errorOnCity()}`}>
                    <span className='text-right px-2'>Ciudad</span>
                    <input
                      name='ciudad'
                      className='focus:outline-none px-3'
                      placeholder='Barranquilla'
                    />
                  </label>
                  <label className={`inline-flex w-2/3 py-3 border ${errorOnDept()}`}>
                    <span className='text-right px-2'>Departamento</span>
                    <input
                      name='depto'
                      className='focus:outline-none px-3'
                      placeholder='Atlántico'
                    />
                  </label>
                  <label
                    className={`xl:w-1/3 xl:inline-flex py-3 items-center flex border ${errorOnZip()}`}
                  >
                    <span className='text-right ml-2 px-2 xl:px-0 xl:text-none'>Cód Postal</span>
                    <input
                      name='codigo_postal'
                      className='focus:outline-none px-3'
                      placeholder='080001'
                    />
                  </label>
                </div>
              </section>
            </div>
            <div className='rounded-md'>
              <section>
                <h2 className='uppercase tracking-wide text-lg font-semibold text-gray-700 my-2'>
                  Payment Information
                </h2>
                <fieldset className='mb-3 bg-white shadow-lg rounded text-gray-600'>
                  <label
                    className={`inline-flex w-2/4 h-12 py-3 items-center border ${errorOnCard()}`}
                  >
                    <span className='text-right px-2'>Tarjeta</span>
                    <input
                      name='card'
                      className='focus:outline-none px-3 w-full'
                      placeholder='Número Tarjeta'
                      required=''
                    />
                  </label>
                  <label
                    className={`xl:w-1/4 xl:inline-flex py-3 items-center flex border ${errorOnExp()}`}
                  >
                    <span className='text-right px-2'>Vencimiento</span>
                    <input name='thru' className='focus:outline-none w-1/3' placeholder='MM/AA' />
                  </label>
                  <label
                    className={`xl:w-1/4 xl:inline-flex py-3 items-center flex border ${errorOnCvv()}`}
                  >
                    <span className='text-right xl:px-0 xl:text-none ml-2'>CVV</span>
                    <input name='cvv' className='focus:outline-none ml-2 w-2/3' placeholder='123' />
                  </label>
                </fieldset>
              </section>
            </div>
            <button
              onClick={() => {
                setShowErrors(true);
                handleSubmit();
              }}
              className='submit-button px-4 py-3 rounded-full bg-main-orange text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors'
            >
              Pay ${parseFloat(parseFloat(getTotal()) + 10).toFixed(2)}
            </button>
          </form>
        </div>
        <div className='col-span-1 bg-white lg:block hidden'>
          <h1 className='py-6 border-b-2 text-xl text-gray-600 px-8'>Order Summary</h1>
          <ul className='py-6 border-b space-y-6 px-8'>
            {items.map((item, index) => (
              <CheckoutItem item={item} key={index} />
            ))}
          </ul>
          <div className='px-8 border-b'>
            <div className='flex justify-between py-4 text-gray-600'>
              <span>Subtotal</span>
              <span className='font-semibold text-pink-500'>${getTotal()}</span>
            </div>
            <div className='flex justify-between py-4 text-gray-600'>
              <span>Shipping</span>
              <span className='font-semibold text-pink-500'>$10.00</span>
            </div>
          </div>
          <div className='font-semibold text-xl px-8 flex justify-between py-8 text-gray-600'>
            <span>Total</span>
            <span>${parseFloat(parseFloat(getTotal()) + 10).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Checkout;

import React, { useEffect } from 'react';
import Layout from '../components/layout';
import { useItemStore, removeItem, addItem, updateItem } from '../hooks/useItemStore';
import useLoginToken from '../hooks/useLoginToken';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '35%',
  },
};

const INITIAL_STATE = {
  name: '',
  price: '',
  rating: '',
  picture_url: '',
};

function ModalCreate({ error, status, modalIsOpen, closeModal, handleChange, form, create }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Upsert Modal'
    >
      <div className='px-8'>
        <h1 className='mb-6 text-center'>{status === 'creating' ? 'Nuevo Item' : 'Editar Item'}</h1>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
            Nombre
          </label>
          <input
            value={form.name}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='name'
            name='name'
            type='text'
            placeholder='Name'
          />
          {error.name && <p className='text-red-500 text-xs italic'>{error.name}</p>}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
            Precio
          </label>
          <input
            value={form.price}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='price'
            name='price'
            type='text'
            placeholder='Price'
          />
          {error.price && <p className='text-red-500 text-xs italic'>{error.price}</p>}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
            Rating
          </label>
          <input
            value={form.rating}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='rating'
            name='rating'
            type='text'
            placeholder='Rating'
          />
          {error.rating && <p className='text-red-500 text-xs italic'>{error.rating}</p>}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
            URL de Imagen
          </label>
          <input
            value={form.picture_url}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='picture_url'
            name='picture_url'
            type='text'
            placeholder='URL de Imagen'
          />
          {error.rating && <p className='text-red-500 text-xs italic'>{error.picture_url}</p>}
        </div>

        <div>
          <button
            className='w-full bg-main-orange text-xl py-3 rounded-lg text-white hover:bg-main-blue-2 hover:text-black transition-all duration-200 font-semibold'
            onClick={create}
          >
            {' '}
            {status === 'creating' ? 'Agregar Item' : 'Guardar'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export const Master = () => {
  const { items, dispatch } = useItemStore();
  const [elemsPerPage, setElemsPerPage] = useState(5);
  const [form, setForm] = useState(INITIAL_STATE);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState({});
  const [status, setStatus] = useState('creating');
  const { token } = useLoginToken();

  if (!token || token.role !== 'admin') {
    return (
      <Layout>
        <img className='aspect-auto h-96 w-auto' src='/nope.png' alt='fail picture' />
        <p className='text-2xl mb-3'>
          Debes iniciar sesi??n como administrador para ver esta p??gina
        </p>
        <Link to='/' className='h-6'>
          <button className='font-semibold border-b-2 border-main-orange text-xl'>
            Volver a Inicio
          </button>
        </Link>
      </Layout>
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }
  function handleEdit(item) {
    setForm(item);
    setStatus('editing');
    setModalIsOpen(true);
  }
  function validation({ name, price, rating }) {
    const myError = {};
    if (!name) {
      myError.name = 'Please choose a name.';
    }
    if (!price) {
      myError.price = 'Please choose a price.';
    }
    if (!rating) {
      myError.rating = 'Please choose a rating.';
      // setError({...error, number_identification: 'El numero de identificaci??n es obligatorio'})
    }
    return myError;
  }
  function create() {
    const lastItem = items[items.length - 1];
    const isValid = validation(form);
    setError(isValid);
    if (Object.keys(isValid).length > 0) {
      return;
    }

    if (status === 'creating') {
      dispatch(addItem(form));
    } else {
      dispatch(updateItem(form.id, form));
    }

    setForm(INITIAL_STATE);
    setModalIsOpen(false);
  }
  return (
    <Layout>
      <p className='text-2xl mb-10'>Crea, Edita, y Modifica los items que se pueden comprar!</p>
      <div className='container flex justify-center mx-auto'>
        <div className='flex flex-col'>
          <div className='flex justify-between mb-4'>
            <ModalCreate
              status={status}
              error={error}
              handleChange={handleChange}
              create={create}
              form={form}
              closeModal={() => setModalIsOpen(!modalIsOpen)}
              modalIsOpen={modalIsOpen}
            />

            <button
              className='w-full bg-main-orange text-xl py-3 rounded-lg text-white hover:bg-main-blue-2 hover:text-black transition-all duration-200 font-semibold'
              onClick={() => {
                setStatus('creating');
                setModalIsOpen(true);
              }}
            >
              Create new
            </button>
          </div>
          <div className='w-full'>
            <div className='border-b border-gray-200 shadow'>
              <table className='divide-y divide-green-400 '>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-2 text-xs text-gray-500'>ID</th>
                    <th className='px-6 py-2 text-xs text-gray-500'>Name</th>
                    <th className='px-6 py-2 text-xs text-gray-500'>Price</th>
                    <th className='px-6 py-2 text-xs text-gray-500'>Rating</th>
                    <th className='px-6 py-2 text-xs text-gray-500'>Edit</th>
                    <th className='px-6 py-2 text-xs text-gray-500'>Delete</th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-300'>
                  {items.map((item) => {
                    return (
                      <tr className='whitespace-nowrap' key={item.id}>
                        <td className='px-6 py-4 text-sm text-gray-500'>{item.id}</td>
                        <td className='px-6 py-4'>
                          <div className='text-sm text-gray-900'>{item.name}</div>
                        </td>
                        <td className='px-6 py-4'>
                          <div className='text-sm text-gray-500'>{item.price}</div>
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-500'>{item.rating}</td>
                        <td className='px-6 py-4'>
                          <button onClick={() => handleEdit(item)}>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              class='w-6 h-6 text-blue-400'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2
                      2 0 112.828
                      2.828L11.828 15H9v-2.828l8.586-8.586z'
                              />
                            </svg>
                          </button>
                        </td>
                        <td className='px-6 py-4'>
                          <button onClick={() => dispatch(removeItem(item.id))}>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              class='w-6 h-6 text-red-400'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5
                      4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Master;

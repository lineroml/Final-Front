import React from 'react';
import Layout from '../components/layout';
import Paginator from '../components/paginationManager';
import { useItemStore } from '../hooks/useItemStore';
import { useState, useEffect } from 'react';

export const Main = () => {
  const { items } = useItemStore();
  const [elemsPerPage, setElemsPerPage] = useState(5);

  function handleElementsPerPage(event) {
    setElemsPerPage(event.target.value);
  }

  useEffect(() => {
    console.log('useEffect main', elemsPerPage);
  }, [elemsPerPage]);

  return (
    <Layout>
      <div className='mt-10 w-full flex flex-wrap justify-center items-center'>
        <span className='font-bold text-4xl'>Bienvenido!</span>
        <img src='/purchase.svg' alt='' className='h-80 -mb-52 sm:flex hidden' />
        <img src='/purchase.svg' alt='' className='h-44 -mb-24 sm:hidden flex' />
        <div className='w-11/12 h-80 bg-main-blue-2 sm:hidden flex rounded-lg mt-6'>
          <img src='/shopping_app.svg' alt='' className='h-48 -mb-4 -ml-8 self-end' />
          <div className='-ml-40 text-xl mr-8 mt-8'>
            Aquí puedes encontrar de <span className='font-bold'>todo</span>,
            <br /> Y sin salir de la casa, que <span className='font-bold'>delícia</span>!
          </div>
        </div>
        <div className='w-10/12 sm:flex hidden h-80 bg-main-blue-2 rounded-lg gap-x-7'>
          <img src='/shopping_app.svg' alt='' className=' h-80 ml-20 mt-20' />
          <div className='w-full h-full mr-12 lg:ml-0 -ml-60 text-xl lg:text-4xl flex justify-center items-center'>
            <div>
              Aquí puedes encontrar de <span className='font-bold'>todo</span>,
              <br /> Y sin salir de la casa, que <span className='font-bold'>delícia</span>!
            </div>
          </div>
        </div>
      </div>
      <a href='#productos'>
        <i
          class='fa-solid fa-angles-down text-3xl text-main-orange sm:mt-44 mt-20'
          id='productos'
        />
      </a>
      <h1 className='text-2xl text-center mb-20'>Revisa nuestros productos!</h1>
      <div className=' self-end sm:mr-12 mr-2'>
        elements per page
        <select name='elementsPerPage' id='elementsPerPage' onChange={handleElementsPerPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
      <div className='max-w-7xl w-full'>
        <Paginator items={items} elementsPerPage={parseInt(elemsPerPage)}></Paginator>
      </div>
    </Layout>
  );
};

export default Main;

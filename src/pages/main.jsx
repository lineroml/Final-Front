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

  return (
    <Layout>
      <div className='mt-10 flex flex-wrap justify-center items-center'>
        <h1 className='text-2xl'>Revisa nuestros productos!</h1>
      </div>
      <div className='bg-blue-200 self-end mr-12'>
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

import React from 'react';
import Layout from '../components/layout';
import Paginator from '../components/paginationManager';
import { useItemStore } from '../hooks/useItemStore';

export const Main = () => {
  const { items } = useItemStore();
  return (
    <Layout>
      <div className='mt-10 flex flex-wrap justify-center items-center'>
        <h1 className='text-2xl'>Revisa nuestros productos!</h1>
      </div>
      <Paginator items={items}></Paginator>
    </Layout>
  );
};

export default Main;

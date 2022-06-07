import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';

function Success() {
  return (
    <Layout>
      <p className='text-2xl'>Gracias por tu compra!</p>
      <img className='aspect-auto h-96 w-auto' src='/success.png' alt='success picture' />
      <Link to='/' className='h-6'>
        <button className='font-semibold border-b-2 border-main-orange text-xl'>
          Seguir Comprando
        </button>
      </Link>
    </Layout>
  );
}

export default Success;

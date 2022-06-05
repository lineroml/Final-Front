import React from 'react';
import Layout from '../components/layout';
import Paginator from '../components/paginationManager';
import { useCart } from '../hooks/useCart';

const Test = () => {
  const { items } = useCart();
  return (
    <Layout>
      {items.map((item) => {
        return <div>{item.name}</div>;
      })}
    </Layout>
  );
};

export default Test;

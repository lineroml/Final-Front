import React from 'react';
import Layout from '../components/layout';
import Paginator from '../components/paginationManager';
import { useCart } from '../hooks/useCart';

const Test = () => {
  const { items } = useCart();
  console.log(items);
  return <Layout></Layout>;
};

export default Test;

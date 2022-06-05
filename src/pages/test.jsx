import React from 'react';
import Layout from '../components/layout';
import Paginator from '../components/paginationManager';

const Test = () => {
  const arr = [];
  return (
    <Layout>
      <Paginator items={arr}></Paginator>
    </Layout>
  );
};

export default Test;

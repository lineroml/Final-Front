import React from 'react';
import Header from './header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='mt-10 mx-10'>{children}</div>
    </>
  );
};

export default Layout;

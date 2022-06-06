import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import useLoginToken from '../hooks/useLoginToken';
import { useCart } from '../hooks/useCart';

const Header = () => {
  const { token, logOut } = useLoginToken();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate('/');
  };

  return (
    <div className='w-full z-50 md:h-24 h-full bg-white sticky top-0 md:mt-0 mt-2 flex-wrap shadow-xl flex justify-between md:px-10 px-2 items-center'>
      <Fade top>
        <div className='w-max flex items-center justify-center'>
          <a href='/'>
            <img src='/logo_2.png' alt='Logo' className='object-contain aspect-auto h-20' />
          </a>
        </div>

        {!token ? (
          <>
            <div className='w-max gap-x-6 flex-nowrap sm:flex hidden items-center justify-between px-6'>
              <a href='/login' className='h-6'>
                <button className='font-semibold text-sm border-b-2 border-main-orange'>
                  Crear cuenta
                </button>
              </a>
              <a href='/login'>
                <button className='bg-main-orange px-6 py-2 rounded-lg text-white hover:bg-main-blue-2 hover:text-black transition-all duration-200 font-semibold'>
                  Iniciar sesión
                </button>
              </a>
            </div>
            <div className='w-max gap-x-6 flex-nowrap sm:hidden flex items-center justify-between px-6'>
              <a href='/login'>
                <button className='bg-main-orange px-6 py-2 rounded-lg text-white hover:bg-main-blue-2 hover:text-black transition-all duration-200 font-semibold'>
                  <i class='fa-solid fa-right-to-bracket'></i>
                </button>
              </a>
            </div>
          </>
        ) : (
          <div className='flex px-4 sm:mb-0 mb-2 font-bold flex-wrap sm:w-max w-screen h-full items-center justify-between'>
            <Link to='/cart'>
              <button className='mr-8 py-2 bg-main-orange min-w-max font-bold text-sm px-4 rounded-full'>
                <span className='sm:flex hidden'>Ver Carrito ({items.length})</span>
                <span className='sm:hidden flex'>
                  <i className='fa-solid fa-shopping-cart'></i>
                </span>
              </button>
            </Link>

            <button
              className='ml-2 w-40 flex h-10 aspect-square hover:bg-main-orange group bg-white transition-all duration-300 ease-in-out rounded-full'
              onClick={handleLogout}
            >
              <img src='/logo_2.png' alt='logo' className='w-6 aspect-auto mr-2' />
              <span className='truncate justify-center'>Log Out</span>
            </button>
          </div>
        )}
      </Fade>
    </div>
  );
};

export default Header;

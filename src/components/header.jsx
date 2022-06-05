import React from 'react';
import Fade from 'react-reveal/Fade';
import useLoginToken from '../hooks/useLoginToken';

const Header = () => {
  const { token } = useLoginToken();

  return (
    <div className='w-full z-50 md:h-24 h-full bg-white sticky top-0 md:mt-0 mt-2 flex-wrap shadow-xl flex justify-between md:px-10 px-2 items-center'>
      <Fade top>
        <div className='sm:w-max w-screen flex items-center justify-center'>
          <a href='/'>
            <img src='/logo192.png' alt='Logo' className='object-contain aspect-auto h-16' />
          </a>
        </div>

        {!token ? (
          <div className='sm:w-max sm:mb-0 mb-2 flex-nowrap w-screen flex justify-between px-6'>
            <a href='/login'>
              <button className='mr-6 font-semibold text-sm border-b-2 border-main-orange'>
                Create account
              </button>
            </a>
            <a href='/login'>
              <button className='relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full'>
                <span className='w-full h-full bg-gradient-to-br from-main-orange to-main-blue group-hover:from-main-blue group-hover:to-main-orange absolute'></span>
                <span className='relative flex px-6 py-3 transition-all ease-out bg-white rounded-full group-hover:bg-opacity-0 duration-400'>
                  <span className='relative text-black text-sm '>Log In</span>
                  <i className='ml-2 fa-solid fa-right-from-bracket'></i>
                </span>
              </button>
            </a>
          </div>
        ) : (
          <div className='flex px-4 sm:mb-0 mb-2 font-bold flex-wrap sm:w-max w-screen h-full items-center justify-between'>
            <a href='/'>
              <button className='mr-8 py-2 bg-main-orange min-w-max font-bold text-sm px-4 rounded-full'>
                <span className='sm:flex hidden'>Crear receta</span>
                <span className='sm:hidden flex'>+</span>
              </button>
            </a>

            <button
              type='submit'
              className='ml-2 w-40 flex h-8 aspect-square hover:bg-main-orange group bg-white transition-all duration-300 ease-in-out rounded-full'
            >
              <a href='/' className='flex w-full'>
                <img src='/logo192.png' alt='chef logo' className='w-6 aspect-auto mr-2' />
                <span className='truncate'>{token.name + ' ' + token.lastName}</span>
              </a>
            </button>
          </div>
        )}
      </Fade>
    </div>
  );
};

export default Header;

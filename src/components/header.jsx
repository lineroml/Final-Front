import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";
import useLoginToken from "../hooks/useLoginToken";
import { useCart } from "../hooks/useCart";

const Header = () => {
  const { token, logOut } = useLoginToken();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  return (
    <div className="w-full z-50 md:h-24 h-full bg-white sticky top-0 md:mt-0 mt-2 flex-wrap shadow-xl flex justify-between md:px-10 px-2 items-center">
      <Fade top>
        <div className="w-max flex items-center justify-center">
          <a href="/">
            <img
              src="/logo_2.png"
              alt="Logo"
              className="object-contain aspect-auto h-20"
            />
          </a>
          {token && token.role === 'admin' ? (
            <div>
              <a href="/master">
                <img
                  src="/logo_2.png"
                  alt="Logo"
                  className="object-contain aspect-auto h-20"
                />
              </a>
            </div>
          ) : (
            <div> </div>
          )}
        </div>

        {!token ? (
          <>
            <div className="w-max gap-x-6 flex-nowrap sm:flex hidden items-center justify-between px-6">
              <a href="/login" className="h-6">
                <button className="font-semibold text-sm border-b-2 border-main-orange">
                  Crear cuenta
                </button>
              </a>
              <a href="/login">
                <button className="bg-main-orange px-6 py-2 rounded-lg text-white hover:bg-main-blue-2 hover:text-black transition-all duration-200 font-semibold">
                  Iniciar sesión
                </button>
              </a>
            </div>
            <div className="w-max gap-x-6 flex-nowrap sm:hidden flex items-center justify-between px-6">
              <a href="/login">
                <button className="bg-main-orange px-6 py-2 rounded-lg text-white hover:bg-main-blue-2 hover:text-black transition-all duration-200 font-semibold">
                  <i class="fa-solid fa-right-to-bracket"></i>
                </button>
              </a>
            </div>
          </>
        ) : (
          <div className="flex px-4 sm:mb-0 mb-2 font-bold flex-wrap w-max h-full items-center justify-between">
            <button className="bg-main-orange mr-4 px-6 py-2 rounded-lg text-white hover:bg-main-blue-2 hover:text-black transition-all duration-200 font-semibold">
              <Link to="/cart">
                <span className="sm:flex hidden">
                  Ver Carrito ({items.length})
                </span>
                <span className="sm:hidden flex">
                  <i className="fa-solid fa-shopping-cart"></i>
                </span>
              </Link>
            </button>

            <button
              className=" px-6 py-2 rounded-lg flex-col flex items-center group hover:text-black transition-colors duration-200 font-semibold"
              onClick={handleLogout}
            >
              <div>
                <i class="fa-solid text-xl fa-face-sad-tear text-main-orange transition-all duration-300 ease-in-out "></i>
                <span className="ml-2 truncate justify-center transition-all duration-300 ease-in-out ">
                  Log Out
                </span>
              </div>
              <div className="w-[0px] group-hover:w-full group-hover:border-t-2 border-black transition-all duration-300 ease-out rounded-full"></div>
            </button>
          </div>
        )}
      </Fade>
    </div>
  );
};

export default Header;

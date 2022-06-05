import React, { useState, useEffect } from 'react';
import ItemCard from './itemCard';

function Paginator({ items, elementsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(elementsPerPage);

  function chunkify(arr) {
    var index = 0;
    var arrayLength = arr.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += size) {
      let myChunk = arr.slice(index, index + size);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }

    return tempArray;
  }
  const [paginatedItems, setPaginatedItems] = useState(() => chunkify(items));
  const [products, setProducts] = useState(paginatedItems[currentPage - 1]);

  useEffect(() => {
    setPaginatedItems(chunkify(items));
    setProducts(paginatedItems[0]);
    setCurrentPage(new Number(1));
  }, [size]);

  useEffect(() => {
    setProducts(paginatedItems[currentPage - 1]);
  }, [currentPage]);

  useEffect(() => {
    setSize(elementsPerPage);
  }, [elementsPerPage]);

  const getColour = (page) => {
    let page_copy = currentPage;
    if (typeof page_copy === 'object') {
      page_copy = parseInt(page_copy);
    }
    if (page == currentPage) {
      return 'text-gray-500 bg-gray-200 border border-gray-300 hover:bg-gray-100 hover:text-gray-700';
    } else {
      return 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700';
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < paginatedItems.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  console.log('paginator', paginatedItems);

  return (
    <>
      <div className='flex justify-center flex-wrap w-full'>
        {products.map((item, index) => {
          return <ItemCard product={item} />;
        })}
      </div>
      <div className='flex justify-center mt-10'>
        <nav aria-label='Pagination Handler'>
          <ul className='inline-flex -space-x-px'>
            <li key={'before'}>
              <button
                onClick={previousPage}
                className='py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
              >
                Previous
              </button>
            </li>
            {paginatedItems.map((page, index) => {
              return (
                <li key={index}>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`py-2 px-3 leading-tight ${getColour(index + 1)}`}
                  >
                    {index + 1}
                  </button>
                </li>
              );
            })}
            <li key={'after'}>
              <button
                onClick={nextPage}
                className='py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 '
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Paginator;

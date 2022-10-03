import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getdata } from '../Redux/Action';
import { Text, Heading } from '@chakra-ui/react';
import Filter from '../component/Filter';
import Product from '../component/Product';
import './style.css';

const Shop = () => {
 
  const loading = useSelector((state) => state.reducer.isLoading);
  // console.log('loading:', loading);
  const Error = useSelector((state) => state.reducer.isError);
  // console.log('Error:', Error);

  const products = useSelector((state) => state.reducer.data);
  // console.log('products:', products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getdata());
  }, []);

  return (
    <div>
      <div style={{display:"flex" , marginTop:"50px"}} >
        
        <Filter />

        {loading ? (
          <h1> loading....</h1>
        ) : Error ? (
          <h1>something went wrong...</h1>
        ) : (
          <div className='map'>
            {products.map((e) => {
              return <Product products={e}  key={e.id}/>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;

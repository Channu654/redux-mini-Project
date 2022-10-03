import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddtoCart, getdata, singleproduct } from '../Redux/Action';
import { Box, Image, Text, Button, Alert, AlertIcon } from '@chakra-ui/react';
import Filter from '../component/Filter';
import Product from '../component/Product';
import './style.css';
import { useParams } from 'react-router-dom';
import { Spinner, HStack, VStack } from '@chakra-ui/react';

const ProductDetails = () => {
  const { id } = useParams();

  const loading = useSelector((state) => state.reducer.isLoading);
  // console.log('loading:', loading);

  const Error = useSelector((state) => state.reducer.isError);
  // console.log('Error:', Error);

  const currentProduct = useSelector((state) => state.reducer.currentProduct);
  const { image, title, price, strike_price } = currentProduct;

  const Addto_cart = useSelector((state) => state.reducer.cart);
  console.log('Addto_cart:', Addto_cart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(singleproduct(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <Spinner />;
  } else if (Error) {
    return <h1>something went wrong....</h1>;
  }

  const handleCart = () => {
    let payload = {
      ...currentProduct,
    };
    if (payload) {
      dispatch(AddtoCart(payload));
    }
  };

  return (
    <VStack>
      <h1>ProductDetails page</h1>
      {/* <Product currentProduct={currentProduct} /> */}
      <Box>
        <Image src={image} w={200} />
      </Box>
      <Text>{title}</Text>
      <HStack>
        <Text>{price}</Text>
        <Text as='s'>{strike_price}</Text>
      </HStack>
      <Button onClick={handleCart}>AddToCart</Button>
    </VStack>
  );
};

export default ProductDetails;

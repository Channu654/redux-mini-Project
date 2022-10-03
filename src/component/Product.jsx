import {
  Box,
  Image,
  Text,
  HStack,
  Spacer,
  Heading,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../pages/style.css';
import { singleproduct } from '../Redux/Action';

const Product = ({ products }) => {
  // console.log('products:', products);
  const state = useSelector((state) => state.reducer.data);
  // console.log('state:', state);
  const dispatch = useDispatch();

  const { image, price, title, strike_price, id, rating } = products;

  const navigate = useNavigate();

  return (
    <Box className='box' onClick={() => navigate(`/collection/all/${id}`)}>
      <Box>
        <Image src={image} className='img' />
      </Box>

      <Text>{title}</Text>
      <HStack>
        <Heading color={'green'} fontSize={20}>
          ${price}
        </Heading>
        <Spacer />
        <VStack>
          <Heading as='s' color={'teal'} fontSize={20}>
            ${strike_price}
          </Heading>
          <Heading color={'teal'} fontSize={16}>
            {rating.rate}
          </Heading>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Product;

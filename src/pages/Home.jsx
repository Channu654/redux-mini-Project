import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getdata } from '../Redux/Action';
import { Heading } from '@chakra-ui/react';

const Home = () => {
  <Heading as='h3'>please click inot shop...</Heading>;
  const state = useSelector((state) => state.reducer.data);
  // console.log('state:', state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getdata());
  }, []);

  return <div></div>;
};

export default Home;

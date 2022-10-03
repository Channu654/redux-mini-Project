import React, { useState } from 'react';
import { Flex, Image, Spacer, Text, Icon, background } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsSearch, BsBasket3 } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import '../pages/style.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Button,
} from '@chakra-ui/react';
import { addItem, deleteCartItem, removeItem } from '../Redux/Action';

const Navbar = () => {
  const Addto_cart = useSelector((state) => state.reducer.cart);
  console.log('Addto_cart:', Addto_cart);

  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const incQty = (id) => {
    dispatch(addItem({ id }));
  };
  const decQty = (id, qty) => {
    if (qty > 1) {
      dispatch(removeItem({ id }));
    } else {
      dispatch(deleteCartItem({ id }));
    }
  };

  let total_price = 0;
  let total_original_price = 0;

  Addto_cart.forEach((prod) => {
    total_price += prod.price * prod.qty;
    total_original_price += prod.strike_price * prod.qty;
  });

  return (
    <Flex bg='#e1ebe4' fontSize={12} width={'100%'}>
      <Image
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3k9Cx3GPOnHJUlvZCJKvPUVLe6ONGqvIgBw&usqp=CAU'
        alt='Dan Abramov'
        px={10}
        w={200}
        h={50}
      />
      <Spacer />
      <Link to='/collection/all'>
        <Text px={6} py={5}>
          SHOP{' '}
        </Text>
      </Link>
      <Link to='/collection/all'>
        <Text px={6} py={5}>
          WOMEN
        </Text>
      </Link>
      <Link to='/collection/all'>
        <Text px={6} py={5}>
          MEN
        </Text>
      </Link>
      <Link to='/collection/all'>
        <Text px={6} py={5}>
          NEW ARRIVALS
        </Text>
      </Link>
      <Link to='/collection/all'>
        <Text px={6} py={5}>
          ABOUT
        </Text>
      </Link>
      <Link to='/collection/all'>
        <Text px={6} py={5}>
          HELP
        </Text>
      </Link>
      <Spacer />
      <Icon as={BsSearch} m={5} boxSize='20px' />
      <Icon as={FiUser} m={5} boxSize='20px' />

      <Icon
        as={BsBasket3}
        m={5}
        boxSize='20px'
        ref={btnRef}
        colorScheme='teal'
        onClick={onOpen}
        _hover={'background:yellow'}
        className='cur'
      />
      <Text position={"absolute"} px={1320}>{Addto_cart ? Addto_cart.length : 0}</Text>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>YOUR CART ({Addto_cart.length})</DrawerHeader>

          <DrawerBody>
            {Addto_cart.length > 0 &&
              Addto_cart.map((item) => {
                console.log('item:', item);
                return (
                  <Flex gap={5} m={3} key={item.id}>
                    <Image src={item.image} w={12} />
                    <Text fontSize={12}>{item.title}</Text>
                    <h1>Rs.{item.price}</h1>
                    <Text as='s'> RS.{item.strike_price}</Text>
                    <Box mr={150}>
                      <Flex>
                        <Button
                          disabled={item.qty === 0}
                          onClick={() => decQty(item.id, item.qty)}>
                          -
                        </Button>
                        <Text>{item.qty}</Text>
                        <Button onClick={() => incQty(item.id)}>+</Button>
                      </Flex>
                    </Box>
                  </Flex>
                );
              })}
          </DrawerBody>
          <Flex align='center' justify={'center'}>
            <Text>SUBTOTAL</Text>
            <Spacer />
            <Flex>
              <Text p={3}> RS. {total_price}</Text>
              <Text p={3} as='s'>
                {' '}
                Rs. {total_original_price}
              </Text>
            </Flex>
          </Flex>

          <DrawerFooter>
            <Button my={20} colorScheme={'yellow'}>
              PROCEED TO CHECKOUT
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;

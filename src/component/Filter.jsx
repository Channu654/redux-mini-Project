import { Box, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { getdata } from '../Redux/Action';

const Filter = () => {
  const fetchdata = useSelector((state) => state.reducer.data);
  // console.log('getdata:', getdata);
  const dispatch = useDispatch();

  const [searchParam, setSearchParams] = useSearchParams();
  const urlCategory = searchParam.getAll('category');
  const urlsortBy = searchParam.get('price');
  console.log('urlsortBy:', urlsortBy);

  const [category, setCategory] = useState(urlCategory || []);
  const [sortBy, setSortBy] = useState(urlsortBy || '');
  console.log('sortBy:', sortBy);

  const handleCategory = (e) => {
    let option = e.target.value;
    let newCategory = [...category];
    if (category.includes(option)) {
      newCategory.splice(newCategory.indexOf(option), 1);
    } else {
      newCategory.push(option);
    }
    setCategory(newCategory);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    if (category) {
      setSearchParams({ category });
      dispatch(getdata({ params: { category } }));
    }
  }, [category, setSearchParams, dispatch]);

  useEffect(() => {
    if (sortBy) {
      const params = {
        category: searchParam.getAll('category'),
        sortBy,
      };
      const getParams = {
        params: {
          category: searchParam.getAll('category'),
          _sort: 'price',
          _order: sortBy,
        },
      };
      console.log("a",getParams);
      setSearchParams(params);
      dispatch(getdata(getParams));
    }
  }, [searchParam, setSearchParams, sortBy, dispatch]);

  return (
    <Box m={3} border={{ border: '1px solid black' }}>
      <Box border={'1px solid black'} w={130} h={300}>
        <h4>Filter</h4>
        <Box>
          <input
            type='checkbox'
            value='mens clothing'
            onChange={handleCategory}
            defaultChecked={category.includes('mens clothing')}
          />
          <label>men</label>
        </Box>
        <Box>
          <input
            type='checkbox'
            value='womens clothing'
            onChange={handleCategory}
            defaultChecked={category.includes('womens clothing')}
          />
          <label>women</label>
        </Box>
        <Box>
          <input
            type='checkbox'
            value='jewelery'
            onChange={handleCategory}
            defaultChecked={category.includes('jewelery')}
          />
          <label>Jeweleries</label>
        </Box>
        <Box>
          <input
            type='checkbox'
            value='electronics'
            onChange={handleCategory}
            defaultChecked={category.includes('electronics')}
          />
          <label>Electronics</label>
        </Box>
        <br />
        <h1>sorting</h1>
        <Box onChange={handleSort}>
          <input
            type='checkbox'
            value='asc'
            name='sortBy'
            defaultChecked={sortBy === 'asc'}
          />
          <label>Asc</label>

          <input
            type='checkbox'
            value='desc'
            name='sortBy'
            defaultChecked={sortBy === 'desc'}
          />
          <label>Dsc</label>
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;

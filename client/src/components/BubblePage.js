import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Bubbles from './Bubbles';
import ColorList from './ColorList';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get('/api/colors')
      .then((res) => {
        console.log(res);
        setColorList(res.data);
      });
  }, [toggle]);
  console.log('colorList: ', colorList);

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        toggle={toggle}
        setToggle={setToggle}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

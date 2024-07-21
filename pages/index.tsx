import React from 'react';
import ProductList from '../components/ProductList';
import ChatBox from '../components/ChatBox';

const Home: React.FC = () => {
  return (
    <div>
      <ProductList />
      <ChatBox />
    </div>
  );
};

export default Home;

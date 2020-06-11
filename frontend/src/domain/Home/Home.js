import React from 'react';
import { useSelector } from 'react-redux';

const Home = (props) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <div>
      <h1>Home</h1>
      <h3>Hello {currentUser.displayName} !</h3>
    </div>
  );
};

export default Home;

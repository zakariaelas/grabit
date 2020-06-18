import React from 'react';

const Home = ({ currentUser }) => {
  return (
    <div>
      <h1>Home</h1>
      <h3>Hello {currentUser.displayName} !</h3>
    </div>
  );
};

Home.whyDidYouRender = true;

export default Home;

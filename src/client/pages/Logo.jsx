import React, { useState, useEffect } from 'react';
import Login from './Login';

const Logo = ({ userId, setUserId }) => {
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      setTimeout(() => setLogin(true), 5500);
    }
  }, []);

  return (
    <>
      {!isLogin && (
        <div id="logo-page">
          <img id="logo-img" alt="Kubik logo" />
        </div>
      )}
      {isLogin && <Login userID={userId} setUserId={setUserId} />}
    </>
  );
};

export default Logo;

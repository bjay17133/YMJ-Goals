import React, { createContext, useState } from 'react';


export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  });


  const signIn = (name, email, avatar) => {
    setUser({ name, email, avatar });
  };

  return (
    <UserContext.Provider value={{ user, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

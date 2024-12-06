// src/context/AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';
import { saveToStorage, getFromStorage, removeFromStorage } from '../storage/AsyncStorage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getFromStorage('user');
      if (storedUser) {
        setUser(storedUser);
      }
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    // Simulate authentication (replace this with your logic)
    if (email === 'test@example.com' && password === 'password123') {
      const userData = { email };
      setUser(userData);
      await saveToStorage('user', userData);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = async () => {
    setUser(null);
    await removeFromStorage('user');
  };

  const register = async (email, password) => {
    // Simulate registration (store locally or validate)
    const userData = { email, password };
    await saveToStorage(`user_${email}`, userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

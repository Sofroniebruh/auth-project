'use client';

import React, { createContext, useContext, useState } from 'react';
import { User } from '@prisma/client';
import { API } from '@/lib/api-client/api';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
};

const defaultValue: AuthContextType = {
  user: null,
  isAuthenticated: false,
  setUser: () => {
  },
  logout: async () => {
  },
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

export const AuthProviderUser = ({ children, initialUser }: {
  children: React.ReactNode,
  initialUser: User | null
}) => {
  const [user, setUser] = useState<User | null>(initialUser);

  const logout = async () => {
    try {
      if (await API.auth.logout()) {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      setUser(user);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

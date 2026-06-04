import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  role: 'buyer' | 'seller' | 'admin' | 'arbitrator';
  address: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Sourav',
    role: 'buyer',
    address: '0x1234...5678'
  });

  const login = () => {
    // Stub
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

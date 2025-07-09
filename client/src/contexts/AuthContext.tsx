
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock authentication - in real app, this would use Supabase Auth
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    // Mock user data based on email
    let role: 'superadmin' | 'admin' | 'user' = 'user';
    let name = 'Regular User';
    
    if (email.includes('admin')) {
      role = 'admin';
      name = 'Admin User';
    } else if (email.includes('superadmin')) {
      role = 'superadmin';
      name = 'Super Admin';
    }
    
    const mockUser: User = {
      id: '1',
      email,
      role,
      name
    };
    
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

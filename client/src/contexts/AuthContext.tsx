import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';
import type { AuthState, SignUpData, SignInData } from '../types/auth';

interface AuthContextType extends AuthState {
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setState({ user: null, isAuthenticated: false, isLoading: false });
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setState({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        localStorage.removeItem('token');
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    };

    checkAuth();
  }, []);

  const signUp = async (data: SignUpData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, data);
      const { user, token } = response.data;

      localStorage.setItem('token', token);
      
      setState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (data: SignInData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, data);
      const { user, token } = response.data;

      localStorage.setItem('token', token);
      
      setState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

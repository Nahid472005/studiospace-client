'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  role?: string;
  wishlist?: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, photoURL?: string) => Promise<void>;
  googleLogin: (email: string, name: string, photoURL?: string) => Promise<void>;
  logout: () => Promise<void>;
  isInWishlist: (studioId: string) => boolean;
  toggleWishlist: (studioId: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  googleLogin: async () => {},
  logout: async () => {},
  isInWishlist: () => false,
  toggleWishlist: async () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Instant hydration from localStorage so page reload NEVER drops session
    const storedUser = localStorage.getItem('studiospace_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('studiospace_user');
      }
    }

    // 2. Validate session with server
    async function checkSession() {
      try {
        const data = await apiRequest('/auth/me');
        if (data.success && data.user) {
          setUser(data.user);
          localStorage.setItem('studiospace_user', JSON.stringify(data.user));
        }
      } catch (err) {
        // If server is unreachable or token expired, keep cached user if recent, or clean up if unauthorized
        // If 401:
        if ((err as Error)?.message?.includes('401')) {
          setUser(null);
          localStorage.removeItem('studiospace_user');
          localStorage.removeItem('studiospace_token');
        }
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (data.success && data.user) {
      setUser(data.user);
      localStorage.setItem('studiospace_user', JSON.stringify(data.user));
      if (data.token) {
        localStorage.setItem('studiospace_token', data.token);
      }
    }
  };

  const register = async (name: string, email: string, password: string, photoURL?: string) => {
    await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, photoURL }),
    });
  };

  const googleLogin = async (email: string, name: string, photoURL?: string) => {
    const data = await apiRequest('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ email, name, photoURL }),
    });

    if (data.success && data.user) {
      setUser(data.user);
      localStorage.setItem('studiospace_user', JSON.stringify(data.user));
      if (data.token) {
        localStorage.setItem('studiospace_token', data.token);
      }
    }
  };

  const logout = async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    } finally {
      setUser(null);
      localStorage.removeItem('studiospace_user');
      localStorage.removeItem('studiospace_token');
      router.push('/login');
    }
  };

  const isInWishlist = (studioId: string): boolean => {
    return !!user?.wishlist?.includes(studioId);
  };

  const toggleWishlist = async (studioId: string): Promise<boolean> => {
    if (!user) {
      router.push('/login');
      return false;
    }

    try {
      const data = await apiRequest('/users/wishlist', {
        method: 'POST',
        body: JSON.stringify({ studioId }),
      });

      if (data.success) {
        const nextWishlist = data.wishlist;
        const updatedUser = { ...user, wishlist: nextWishlist };
        setUser(updatedUser);
        localStorage.setItem('studiospace_user', JSON.stringify(updatedUser));
        return data.saved;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        googleLogin,
        logout,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

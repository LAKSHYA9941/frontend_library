import { createContext, useContext, useReducer, useMemo } from 'react';
import type { ReactNode } from 'react';

type User = {
  name: string;
  email: string;
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

const AuthContext = createContext<
  | (AuthState & {
      login: (email: string, password: string) => Promise<void>;
      register: (name: string, email: string, password: string) => Promise<void>;
      logout: () => void;
    })
  | undefined
>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, isLoading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState, (initial) => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      return { ...initial, user: JSON.parse(savedUser), isAuthenticated: true };
    }
    return initial;
  });

  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const user = { name: email.split('@')[0], email };
          localStorage.setItem('user', JSON.stringify(user));
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
          resolve();
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
          reject(new Error('Invalid credentials'));
        }
      }, 600);
    });
  };

  const register = async (name: string, email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const user = { name, email };
          localStorage.setItem('user', JSON.stringify(user));
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
          resolve();
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
          reject(new Error('Missing required fields'));
        }
      }, 600);
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const contextValue = useMemo(() => ({
    ...state,
    login,
    register,
    logout
  }), [state]);

  return (
    <AuthContext.Provider value={contextValue}>
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

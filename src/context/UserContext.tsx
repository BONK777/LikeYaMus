// src/context/UserContext.tsx
import React, { createContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  login: () => false,
  register: () => false,
  logout: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Проверяем в localStorage сохранённого пользователя при старте
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const usersStr = localStorage.getItem('users');
    if (!usersStr) return false;
    const users = JSON.parse(usersStr) as Array<{name:string,email:string,password:string}>;
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const loggedUser = { name: foundUser.name, email: foundUser.email };
      setUser(loggedUser);
      localStorage.setItem('currentUser', JSON.stringify(loggedUser));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    const usersStr = localStorage.getItem('users');
    const users = usersStr ? JSON.parse(usersStr) as Array<{name:string,email:string,password:string}> : [];
    if (users.find(u => u.email === email)) {
      // Такой email уже есть
      return false;
    }
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    // Автоматический логин после регистрации
    setUser({ name, email });
    localStorage.setItem('currentUser', JSON.stringify({ name, email }));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

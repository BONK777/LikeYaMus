import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { UserProvider } from './context/UserContext';
import PrivateRoute from './components/PrivateRoute';

import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Search from './pages/Search';
import Radio from './pages/Radio';
import NotFound from './pages/NotFound';
import TrackPage from './pages/TrackPage';
import Artist from './pages/Artist';

import Header from './components/Header';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Публичные маршруты */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Защищённые маршруты с общим хедером */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <>
                  <Header />
                  <Navigate to="/home" replace />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <>
                  <Header />
                  <Home />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <>
                  <Header />
                  <Search />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/radio"
            element={
              <PrivateRoute>
                <>
                  <Header />
                  <Radio />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <>
                  <Header />
                  <Profile />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/track/:id"
            element={
              <PrivateRoute>
                <>
                  <Header />
                  <TrackPage />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/artist/:id"
            element={
              <PrivateRoute>
                <>
                  <Header />
                  <Artist />
                </>
              </PrivateRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;

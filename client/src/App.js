import React from 'react';
import './styles/App.css';
import Header from './components/header';
import Todos from './components/todos';
import Login from './components/login-form';

export default function App() {
  const isLoggedIn = false;
  const username = null;

  return (
    <div>
      <Header />
      <main>
        {
          (isLoggedIn)
          ? <Todos />
          : <Login />
        }
      </main>
    </div>
  );
}
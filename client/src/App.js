import React from 'react';
import './styles/App.css';
import Header from './components/header';
import Todos from './components/todos';

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Todos />
      </main>
    </div>
  );
}
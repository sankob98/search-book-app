import React from 'react';
import style from './App.module.css';
import { Routes, Route } from 'react-router-dom';
// import Error from './components/Error/Error';
import Form from './components/Form/Form';
import BookBlock from './components/BookBlock/BookBlock';
import BookPage from './components/BookPage/BookPage';

function App() {
  return (
    <div className={style.App}>
      <Form />
      <Routes>
        <Route path="/" element={<div className={style.search}>search...</div>} />
        <Route path="/books/:bookId" element={<BookPage />} />
        <Route path="/books" element={<BookBlock />} />
      </Routes>
    </div>
  );
}

export default App;

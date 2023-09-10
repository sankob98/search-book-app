import React, { useEffect, useState } from 'react';
import style from './BookBlock.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Book from '../Book/Book';
import Preloader from '../Preloader/Preloader';
import Error from '../Error/Error';
import BtnToTop from '../BtnToTop/BtnToTop';
import { getMoreBooks } from '../../redux/asyncActions';
import { setStartIndex } from '../../redux/filterSlice';

const BookBlock = () => {
  const totalItems = useSelector((state) => state.books.totalItems);
  const books = useSelector((state) => state.books.items);
  const { statusBookBlock, statusGetMoreBooks, haveBooks } = useSelector((state) => state.books);
  const startIndex = useSelector((state) => state.filter.startIndex);
  const dispatch = useDispatch();

  const [scroll, setScroll] = useState();
  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const nextIndex = startIndex + 30;
    dispatch(getMoreBooks(nextIndex));
    dispatch(setStartIndex(nextIndex));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (statusBookBlock === 'pending') return <Preloader />;
  return (
    <div className={style.books_block}>
      {statusBookBlock === 'error' ? (
        <Error />
      ) : (
        <>
          <div>{totalItems ? `Found ${totalItems} results` : `no books found, try again`}</div>
          <div className={style.book_container}>
            {books &&
              books.map((book, id) => {
                return <Book key={book.id + id} bookId={book.id} volumeInfo={book.volumeInfo} />;
              })}
          </div>
          <div>
            {haveBooks && (
              <button
                className={style.btn}
                onClick={handleClick}
                disabled={statusGetMoreBooks === 'pending'}>
                Load more
              </button>
            )}
          </div>
          {statusGetMoreBooks === 'pending' && <Preloader />}
          <BtnToTop scroll={scroll} />
        </>
      )}
    </div>
  );
};

export default BookBlock;

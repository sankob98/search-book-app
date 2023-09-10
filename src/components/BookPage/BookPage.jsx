import React, { useEffect } from 'react';
import style from './BookPage.module.css';
import cover from '../../assets/noCover.jpeg';
import SeparateAuthors from '../../utils/SeparateAuthors';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchBook } from '../../redux/asyncActions';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../Preloader/Preloader';

const BookPage = () => {
  const dispatch = useDispatch();
  const bookInfo = useSelector((state) => state.books.book.volumeInfo);
  const statusBookPage = useSelector((state) => state.books.statusBookPage);
  const { bookId } = useParams();
  useEffect(() => {
    dispatch(fetchBook(bookId));
  }, []);
  if (statusBookPage === 'pending') return <Preloader />;
  return (
    <>
      {bookInfo && (
        <div className={style.book_page}>
          <div className={style.btn_back}>
            <Link to={'/books'} className={style.btn_back_link}>
              <span className={style.btn_back_text}>Back</span>
            </Link>
          </div>
          <div className={style.img_wrapper}>
            <img
              src={bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : cover}
              alt="cover"
              className={style.img}
            />
          </div>
          <div className={style.info}>
            <div className={style.categories}>
              {bookInfo.categories ? bookInfo.categories : null}
            </div>
            <div className={style.title}>{bookInfo.title}</div>
            {bookInfo.authors && (
              <SeparateAuthors className={style.authors} authors={bookInfo.authors} />
            )}
            {bookInfo.description ? (
              <div
                className={style.description}
                dangerouslySetInnerHTML={{ __html: bookInfo.description }}
              />
            ) : (
              <div className={style.description}>No description</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BookPage;

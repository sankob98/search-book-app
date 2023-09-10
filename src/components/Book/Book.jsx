import React from 'react';
import style from './Book.module.css';
import cover from '../../assets/cover.jpg';
import { Link } from 'react-router-dom';

const Book = (props) => {
  return (
    <div className={style.book}>
      <Link to={'/books/' + props.bookId} className={style.link}>
        <img
          className={style.img}
          alt="cover"
          src={props.volumeInfo.imageLinks ? props.volumeInfo.imageLinks.thumbnail : cover}
        />
        <div className={style.info}>
          <div className={style.categories}>
            {props.volumeInfo.categories ? props.volumeInfo.categories[0] : ''}
          </div>
          <h2 className={style.title}>{props.volumeInfo.title ? props.volumeInfo.title : ''}</h2>
          <div className={style.authors}>
            {props.volumeInfo.authors ? props.volumeInfo.authors.join(', ') : ''}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Book;

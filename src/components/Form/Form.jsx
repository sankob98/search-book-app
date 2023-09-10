import React, { useEffect, useState } from 'react';
import style from './Form.module.css';
import SearchImage from '../../assets/img_search.png';
import { useNavigate } from 'react-router';
import PopUpMenu from '../PopUpMenu/PopUpMenu';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setSort, setSearchValue } from '../../redux/filterSlice';
import { fetchBooks } from '../../redux/asyncActions';

const Form = () => {
  let navigate = useNavigate();
  useEffect(() => {
    window.addEventListener('beforeunload', navigate('/'));
    return () => {
      window.removeEventListener('beforeunload', navigate('/'));
    };
  }, []);

  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const categories = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'];
  const sort = ['newest', 'relevance'];
  const { category, sortValue, startIndex } = useSelector((state) => state.filter);

  const onChangeInput = (e) => {
    setInput(e.target.value);
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(setSearchValue(input));
    let params = { input, category, sortValue, startIndex };
    dispatch(fetchBooks(params));
    navigate('/books');
  };

  return (
    <div className={style.wrapper}>
      <header>
        <h1 className={style.title}>Search for the books</h1>
      </header>
      <form onSubmit={handleSubmitForm}>
        <div className={style.inputWrapper}>
          <input
            className={style.input}
            type="search"
            value={input}
            onChange={onChangeInput}
            placeholder="enter your request"
            required
          />
          <button className={style.form_btn}>
            <img className={style.searchIcon} src={SearchImage} alt="search" />
          </button>
        </div>
        <div className={style.popup_wrapper}>
          <PopUpMenu
            filter={categories}
            filterTitle={'Categories'}
            filterValue={category}
            setFilterValue={setCategory}
          />
          <PopUpMenu
            filter={sort}
            filterTitle={'Sorting by'}
            filterValue={sortValue}
            setFilterValue={setSort}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;

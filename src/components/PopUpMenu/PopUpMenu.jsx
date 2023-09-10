import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import style from './PopUpMenu.module.css';

const PopUpMenu = ({ filter, filterValue, filterTitle, setFilterValue }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const filterRef = useRef(null);
  const clickOutSide = (event) => {
    const path = event.composedPath();
    if (!path.includes(filterRef.current)) {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', clickOutSide);
    return () => document.removeEventListener('click', clickOutSide);
  }, []);
  const handleClickOnItem = (value) => {
    dispatch(setFilterValue(value));
    setOpen(false);
  };

  return (
    <div ref={filterRef} className={style.filter}>
      <span className={style.title}>{filterTitle}</span>
      <span className={`${style.active} ${style.titleValue}`} onClick={() => setOpen(!open)}>
        {filterValue}
      </span>
      {open && (
        <ul className={style.list}>
          {filter.map((el, id) => (
            <li
              className={el === filterValue ? style.active : ''}
              key={id} // в качестве ключа использую id массива, так как массив статический
              // и изменяться не планируется
              onClick={() => handleClickOnItem(filter[id])}>
              {el}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PopUpMenu;

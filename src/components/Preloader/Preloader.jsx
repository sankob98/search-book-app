import React from 'react';
import preloader from '../../assets/preloader.gif';
import style from './Preloader.module.css';

const Preloader = () => {
  return (
    <div className={style.preloader}>
      <img src={preloader} alt="preloader" />
    </div>
  );
};

export default Preloader;

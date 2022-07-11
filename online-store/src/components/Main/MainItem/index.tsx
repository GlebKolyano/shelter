import React from 'react';
import M from 'materialize-css';
import cl from './style.module.css';
import { IBicycle } from '../../../models/models';

function MainItem({ item }: { item: IBicycle }) {
  const { brand, name, speeds, image } = item;
  const rootClass = [cl.item, 'z-depth-1'].join(' ');
  return (
    <div className={rootClass}>
      <img className={cl.item__image} src={image} alt="img" />
      <ul className={cl.item__info}>
        <li>Название: {name}</li>
        <li>Брэнд: {brand}</li>
        <li>Количество скоростей: {speeds} </li>
      </ul>
    </div>
  );
}

export default MainItem;
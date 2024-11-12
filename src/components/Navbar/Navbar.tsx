// src/components/Navbar/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import LinkTitle from '../Misc/LinkTitle';

interface NavbarProps {
  sectorId?: number;
}

const Navbar: React.FC<NavbarProps> = ({ sectorId }) => {
  const saveData = (formState: any, sectorId: number) => {
    console.log('Сохранение данных для сектора:', sectorId);
  };

  if (sectorId) {
    return (
      <div id='navbar' className='rounded-navbar fixed-top navsect'>
        <Link to='/' className='nav-item'>
          <i className='fas fa-home' /> Вернуться на главный экран
        </Link>
        <button
          id='btn-Add'
          className='btn btn-warning'
          type='button'
          onClick={() => saveData({}, sectorId)}
        >
          <i className='fas fa-save' />
        </button>
      </div>
    );
  }

  return (
    <div className='navv'>
      <div id='navbar' className='rounded-navbar'>
        <Link to='/dendrology-all' className='nav-item'>
          <LinkTitle title='Дендрология - все записи' className='fas fa-tree' />
        </Link>
        <Link to='/flora-all' className='nav-item'>
          <LinkTitle title='Флора - все записи' className='fas fa-leaf' />
        </Link>
        <Link to='/floriculture-all' className='nav-item'>
          <LinkTitle
            title='Цветоводство - все записи'
            className='fas fa-leaf'
          />
        </Link>
        <Link to='/map' className='nav-item'>
          <LinkTitle title='Карта' className='fas fa-map' />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

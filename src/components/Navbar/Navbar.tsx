// src/components/Navbar/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/navbar.css';
import LinkTitle from '../Misc/LinkTitle';

const Navbar: React.FC = () => {
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

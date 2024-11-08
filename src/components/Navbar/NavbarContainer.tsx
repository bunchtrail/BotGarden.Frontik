import React from 'react';
import NavbarItem, { NavbarItemProps } from './NavbarItem';

interface NavbarContainerProps {
  items: NavbarItemProps[];
}

const NavbarContainer: React.FC<NavbarContainerProps> = ({ items }) => {
  return (
    <div className='navbar-container'>
      {items.map((item) => (
        <NavbarItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default NavbarContainer;

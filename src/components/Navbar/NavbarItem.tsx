// src/components/Navbar/NavbarItem.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarItemProps {
  id: string;
  icon: React.ReactNode;
  text: string;
  to: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ icon, text, to }) => {
  return (
    <div className='navbar-item'>
      <Link to={to} className='navbar-link'>
        {icon}
        <span>{text}</span>
      </Link>
    </div>
  );
};

export default NavbarItem;
export type { NavbarItemProps };

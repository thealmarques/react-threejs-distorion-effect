import React from 'react';
import './header.scss';
import logo from '../../assets/images/logo.jpg';

export const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <img className="header__logo__image" src={logo} alt="Logo" />
      </div>
      <div className="header__menu">
        <span className="header__menu__text">BREEDS</span>
        <span className="header__menu__text">ABOUT US</span>
        <span className="header__menu__text">OUR WORK</span>
        <span className="header__menu__text">GET INVOLVED</span>
      </div>
      <span className="header__donate">Donate</span>
    </div>
  )
}

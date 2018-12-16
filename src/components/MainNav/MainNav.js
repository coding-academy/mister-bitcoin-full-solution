import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import homeImg from '../../assets/icons/home.png'
import increaseImg from '../../assets/icons/increase.png'
import usersImg from '../../assets/icons/users.png'

import './MainNav.css'

class MainNav extends Component {
  
  render() {
    return (
        <header className="main-nav">
        <NavLink exact className='main-nav-item' activeClassName='selected' to="/">
          <img src={homeImg} alt="Home" width="24px" height="24px" />
        </NavLink>
        <NavLink className='main-nav-item' activeClassName='selected' to="/contacts">
          <img src={usersImg} alt="Contacts" width="24px" height="24px" />
        </NavLink>
        <NavLink className='main-nav-item' activeClassName='selected' to="/statistics">
          <img src={increaseImg} alt="Statistics" width="24px" height="24px" />
        </NavLink>
      </header>
    );
  }
}

export default MainNav;

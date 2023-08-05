import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainNavbar() {
  const navigate = useNavigate();

  return (
    <nav>
      <ul className='main-navbar-container'>
        <li>
          <button onClick={() => navigate('/links')} className='btn light-btn'>Links</button>
        </li>
        <li>
          <button onClick={() => navigate('/profile')} className='btn light-btn'>Profile</button>
        </li>
        <li>
          <button onClick={() => navigate('/preview/')} className='btn light-btn'>Preview</button>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavbar;


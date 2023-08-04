import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainNavbar() {
  const navigate = useNavigate();

  return (
    <nav>
      <ul className='main-navbar-container'>
        <li>
          <button onClick={() => navigate('/links')}>Links</button>
        </li>
        <li>
          <button onClick={() => navigate('/profile')}>Profile</button>
        </li>
        <li>
          <button onClick={() => navigate('/preview/')}>Preview</button>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavbar;


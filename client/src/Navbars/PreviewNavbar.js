import React from 'react';
import { useNavigate } from 'react-router-dom';

function PreviewNavbar() {
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li>
          <button onClick={() => navigate('/links')}>Back to Links</button>
        </li>
        <li>
          <button >Share Links</button>
        </li>
      </ul>
    </nav>
  );
}

export default PreviewNavbar;
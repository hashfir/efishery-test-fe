import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderComponent } from '../../component';
import '../pages.css';

function MainLayout(props) {
  const {
    header = '',
  } = props;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 820);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="main">
      <HeaderComponent
        header={header}
      />
      <div className="content" style={{ width: isMobile ? "98%" : "80%" }}>
        <Outlet />
      </div>
    </div>

  );
}

export default MainLayout;

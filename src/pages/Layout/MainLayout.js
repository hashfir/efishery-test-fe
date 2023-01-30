import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderComponent } from '../../component';
import '../pages.css';

function MainLayout(props) {
  const {
    header = '',
    LayoutWidth = '80%'
  } = props;
  return (
    <div className="main">
      <HeaderComponent
        header={header}
      />
      <div className="content" style={{ width: LayoutWidth }}>
        <Outlet />
      </div>
    </div>

  );
}

export default MainLayout;

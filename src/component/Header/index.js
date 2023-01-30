import React from 'react';
import '../component.css';

function HeaderComponent(props) {
  const {
    header = '',
  } = props;
  return (
    <div className="headerDefault">
      <span className="textHeaderDefault">
        {header}
      </span>
    </div>

  );
}

export default HeaderComponent;

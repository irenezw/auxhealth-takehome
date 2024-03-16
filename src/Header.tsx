import React from 'react';

import fullLogo from './assets/AuxHealth-Full-Logo.svg'

const Header: React.FC = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="mt-3 flex-1 flex justify-center items-center">
        <img src={fullLogo} alt="AuxHealth Logo" className="h-14" />
      </div>
    </div>
  );
};


export default Header;
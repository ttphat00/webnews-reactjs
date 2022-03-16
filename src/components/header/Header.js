import React from 'react';
import TopHeader from './TopHeader';
import MenuNavbar from './MenuNavbar';

function Header() {
    return (
        <>
            <header className="header-area">
                <TopHeader />
                <MenuNavbar />
            </header>
        </>
    );
  }
  
  export default Header;
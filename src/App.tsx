import { react, useEffect } from 'react';
import './App.css';
import Feed from './Feed.tsx'
import Header from './Header.tsx'

import LeftMenu from './LeftMenu.tsx'


function App() {
  useEffect(() => {
    // Set the theme to 'nordic'
    document.documentElement.setAttribute('data-theme', 'nord');
  }, []);

  return (
    <>
      <div>
        <Header />
        <div className="flex ">

          <LeftMenu />
          <Feed />
        </div>

      </div>


    </>
  );
}

export default App;
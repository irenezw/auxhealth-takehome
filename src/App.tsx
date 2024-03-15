import { useEffect, useRef, useState } from 'react';
import './App.css';
import Feed from './Feed.tsx';
import Header from './Header.tsx';
import LeftMenu from './LeftMenu.tsx';

function App() {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    // Set the theme to 'nordic'
    document.documentElement.setAttribute('data-theme', 'nord');

    // Calculate and update header height
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight; // Get the actual height of the header
      setHeaderHeight(height); // Update the header height state
    }
  }, []);

  return (
    <>
      <div ref={headerRef} className="fixed top-0 left-0 w-full z-10">
        <Header />
      </div>
      <div style={{ paddingTop: `${headerHeight}px` }}> {/* Now dynamically adjusted based on header height */}
        <div className="">
        </div>
        <Feed />
      </div>
    </>
  );
}

export default App;

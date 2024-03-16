import { FC, useEffect, useRef, useState } from 'react';
import './App.css';
import Feed from './Feed.tsx';
import Header from './Header.tsx';

const App: FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'nord');

    // Calculate and update header height
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      setHeaderHeight(height);
    }
  }, []);

  return (
    <>
      <div ref={headerRef} className="fixed top-0 left-0 w-full z-10">
        <Header />
      </div>
      <div style={{ paddingTop: `${headerHeight}px` }}>
        <div className="">
        </div>
        <Feed />
      </div>
    </>
  );
}

export default App;

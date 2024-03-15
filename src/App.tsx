import { useEffect } from 'react';
import './App.css';
import Feed from './Feed.tsx'
import Header from './Header.tsx'


function App() {
  useEffect(() => {
    // Set the theme to 'nordic'
    document.documentElement.setAttribute('data-theme', 'nord');
  }, []);

  return (
    <>
      <Header />
      <Feed />
    </>
  );
}

export default App;
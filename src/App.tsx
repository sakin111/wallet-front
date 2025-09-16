
import { Outlet } from 'react-router'
import './App.css'
import Common from './components/layout/Common'
import { useEffect, useState } from 'react';
import { SkeletonCard } from './pages/SkeletonCard';

function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
 <SkeletonCard/>
    );
  }
  return (
    <Common>
      <Outlet />
    </Common>
  )
}

export default App

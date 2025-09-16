
import { Outlet } from 'react-router'
import './App.css'
import Common from './components/layout/Common'
import { useEffect, useState } from 'react';

function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* Skeleton or spinner */}
        <div className="animate-pulse space-y-4 w-80">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  return (
    <Common>
      <Outlet />
    </Common>
  )
}

export default App

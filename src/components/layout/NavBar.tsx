import { useState } from 'react';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ModeToggle } from './ModeToggler';
import Logo from '@/assets/icons/Logo';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate('/');
  // };





  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <nav className="fixed top-0 w-full max-w-full z-50  bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Login/Dashboard Button */}
          <div className="flex items-center space-x-4">
            {/* {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => navigate(`/${user?.role}-dashboard`)}
                  variant="outline"
                  className="hidden md:flex"
                >
                  Dashboard
                </Button>
                <Button onClick={handleLogout} variant="ghost">
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )} */}
            <ModeToggle />
            <Button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="ghost"
                size="sm"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            {/* {isAuthenticated && (
              <Button
                onClick={() => {
                  navigate(`/${user?.role}-dashboard`);
                  setIsOpen(false);
                }}
                variant="outline"
                className="w-full mt-2"
              >
                Dashboard
              </Button>
            )} */}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { ModeToggle } from './ModeToggler';
import Logo from '@/assets/icons/Logo';
import { useDispatch } from 'react-redux';
import { authApi, useLogoutMutation, useUserInfoQuery } from '@/redux/features/auth/auth.api';
import { role } from '@/constant/role';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useUserInfoQuery(undefined)


  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };


  const navItems = [
    { name: 'Home', href: '/' , role: "PUBLIC"},
    { name: 'Features', href: '/features' , role: "PUBLIC"},
    { name: 'About', href: '/about' , role: "PUBLIC"},
    { name: 'Contact', href: '/contact', role: "PUBLIC" },
    { name: 'FAQ', href: '/faq', role: "PUBLIC"},
    { name: 'Dashboard', href: '/admin', role: role.admin},
    { name: 'Dashboard', href: '/agent', role: role.agent},
    { name: 'Dashboard', href: '/user', role: role.user },
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
             {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navItems.map((link, index) => (
                  <React.Fragment key={index}>
                    {link.role === "PUBLIC" && (
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.name}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                    {link.role === data?.data?.role && (
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.name}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </React.Fragment>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
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




            {data?.data?.email && (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-sm"
              >
                Logout
              </Button>
            )}
            {!data?.data?.email && (
              <Button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}


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
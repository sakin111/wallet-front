import  { useState } from 'react';
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
import { TourWrapper } from '@/pages/TourWrapper';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useUserInfoQuery(undefined)

  const steps = [
    { target: '[data-tour="navigation-menu"]', content: "This is a all navigation menu" }
  ];

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


  const getVisibleNavItems = () => {
    return navItems.filter(item => 
      item.role === "PUBLIC" || item.role === data?.data?.role
    );
  };

  return (
    <TourWrapper tourId="navbar-tour" steps={steps} autoStart={true} delay={500}>
      <nav className="fixed top-0 left-0 w-full max-w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <Logo />


            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">

                <NavigationMenu className="max-md:hidden" data-tour="navigation-menu">
                  <NavigationMenuList className="gap-2">
                    {getVisibleNavItems().map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.name}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>


            <div className="flex items-center space-x-4">
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


        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {getVisibleNavItems().map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="text-muted hover:text-primary block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </TourWrapper>
  );
}
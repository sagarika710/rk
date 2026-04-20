
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from "../assets/Img/LOGORK.jpg"
import BookingModal from './BookingModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Services', path: '/services' },
    { name: 'Monthly Pass', path: '/passes' },
    { name: 'About', path: '/about' },
    { name: 'Support', path: '/support' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <BookingModal
        movie={{ title: 'Book Tickets' }}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
            <img src={logo} style={{height:"55px"}}/>
            
              {/* <Film className="h-8 w-8 text-red-600" /> */}
              <div className="flex flex-col">
                <span className=" font-cinzel text-xl font-bold tracking-wider leading-none">
                  RADHA<span className="text-red-600">KRISHNA</span>
                </span>
                <span className="text-gold text-[10px] tracking-[0.2em] font-bold">CINEMAX</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-red-600'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setIsBookingOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-bold transition-transform active:scale-95"
            >
              Book Now
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-white/10 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-red-600 bg-red-600/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setIsBookingOpen(true);
                setIsOpen(false);
              }}
              className="block px-3 py-3 mt-4 text-center bg-red-600 text-white font-bold rounded-md"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
      </nav>
    </>
  );
};

export default Navbar;

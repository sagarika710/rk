
import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Facebook, Instagram, Twitter, MapPin, Phone, Mail, Settings } from 'lucide-react';
import { THEATRE_NAME, LOCATION } from '../../constants';
import logo from "../assets/Img/LOGORK.jpg"

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
            <img src={logo} style={{height:"55px"}}/>
              {/* <Film className="h-8 w-8 text-red-600" /> */}
              <div className="flex flex-col">
                <span className="font-cinzel text-xl font-bold tracking-wider leading-none">
                  RADHA<span className="text-red-600">KRISHNA</span>
                </span>
                <span className="text-gold text-[10px] tracking-[0.2em] font-bold">CINEMAX</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the magic of cinema in the heart of Nayagarh. Radhakrishna Cinemax brings you world-class sound, vision, and comfort since 1985.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/5 hover:bg-red-600/20 hover:text-red-600 rounded-full transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-red-600/20 hover:text-red-600 rounded-full transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-red-600/20 hover:text-red-600 rounded-full transition-all">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 font-cinzel tracking-wider">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-red-600 transition-colors">Home</Link></li>
              <li><Link to="/movies" className="hover:text-red-600 transition-colors">Now Showing</Link></li>
              <li><Link to="/movies" className="hover:text-red-600 transition-colors">Upcoming Movies</Link></li>
              <li><Link to="/passes" className="hover:text-red-600 transition-colors">Monthly Pass</Link></li>
              <li><Link to="/services" className="hover:text-red-600 transition-colors">Corporate Booking</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6 font-cinzel tracking-wider">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/support" className="hover:text-red-600 transition-colors">FAQs</Link></li>
              <li><Link to="/support" className="hover:text-red-600 transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-red-600 transition-colors">Our Story</Link></li>
              <li><Link to="/services" className="hover:text-red-600 transition-colors">Advertise with Us</Link></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 font-cinzel tracking-wider">Contact Us</h4>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
                <span>{LOCATION}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-600 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-600 shrink-0" />
                <span>info@rkcinemax.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs gap-4">
          <p>© {new Date().getFullYear()} {THEATRE_NAME}. All rights reserved.</p>
          <div className="flex flex-wrap justify-center md:justify-end space-x-6">
            <Link to="/admin" className="flex items-center hover:text-red-600 transition-colors font-bold">
              <Settings className="h-3 w-3 mr-1" /> Theatre Management
            </Link>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

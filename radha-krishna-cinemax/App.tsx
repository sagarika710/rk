
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './src/components/Navbar';
import Footer from './src/components/Footer';
import Chatbot from './src/components/Chatbot';
import Home from './src/pages/Home';
import About from './src/pages/About';
import Movies from './src/pages/Movies';
import Services from './src/pages/Services';
import Passes from './src/pages/Passes';
import Support from './src/pages/Support';
import AdminPanel from './src/pages/Admin/AdminPanel';
import BookingPartner from './src/pages/BookingPartner';
import BookingThanks from './src/pages/BookingThanks';
import MovieDetails from './src/pages/MovieDetails';
import { DataProvider } from './src/context/DataContext';

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-black">
          <Routes>
            {/* Admin route has no common navbar/footer for full control space */}
            <Route path="/admin" element={<AdminPanel />} />
            
            {/* Public routes */}
            <Route path="/*" element={
              <>
                <Navbar />
                <main className="flex-grow pt-16">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movies/:movieId" element={<MovieDetails />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/passes" element={<Passes />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/booking/partner" element={<BookingPartner />} />
                    <Route path="/booking/thanks" element={<BookingThanks />} />
                  </Routes>
                </main>
                <Footer />
                <Chatbot />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;

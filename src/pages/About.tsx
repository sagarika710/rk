
import React from 'react';
import { THEATRE_NAME } from '../../constants';
import aboutAuditorium from '../assets/Img/about-auditorium.jpg';
import journey1985 from '../assets/Img/journey-1985.png';
import journey2023 from '../assets/Img/journey-2023.jpg';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-gradient-to-b from-red-900/20 to-black py-20 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-cinzel font-bold">Our <span className="text-red-600">Legacy</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Blending historical charm with modern technology, Radhakrishna Cinemax is the heart of entertainment in Nayagarh.
          </p>
        </div>
      </div>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-cinzel font-bold mb-4">About <span className="text-red-600">{THEATRE_NAME}</span></h2>
              <div className="w-20 h-1 bg-red-600"></div>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              Radhakrishna Cinemax, Nayagarh's leading cinema since 1985, blends legacy with modern innovation. Rebranded in 2023 under JSP Signatures Pvt. Ltd., it offers comfortable seating, Dolby Digital Plus sound, and crystal-clear 2D/3D visuals.
            </p>
            <p className="text-gray-300 leading-relaxed">
              From Bollywood to Tollywood and beyond, we bring diverse films to all movie lovers. Experience the magic of cinema with us! Our facility is equipped with the latest laser projection technology and an exquisite concession stand to satisfy all your cravings.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="space-y-2">
                <span className="text-4xl font-bold text-red-600">35+</span>
                <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Years of Service</p>
              </div>
              <div className="space-y-2">
                <span className="text-4xl font-bold text-red-600">1M+</span>
                <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Happy Viewers</p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-red-600/10 rounded-2xl blur-xl group-hover:bg-red-600/20 transition-all"></div>
            <img 
              src={aboutAuditorium}
              alt="Theatre Hall" 
              className="relative w-full rounded-2xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-cinzel font-bold text-center mb-20">Our <span className="text-red-600">Journey</span></h2>
          
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-white/10"></div>
            
            <div className="space-y-24">
              {/* Point 1 */}
              <div className="relative flex items-center justify-between">
                <div className="w-5/12 text-right space-y-4">
                  <h3 className="text-2xl font-bold text-red-600">1985</h3>
                  <h4 className="text-xl font-bold">Radhakrishna Talkies</h4>
                  <p className="text-gray-400 text-sm">Founded in 1985 by Mr. Benudhara Mahapatra and later led by the late Mr. Manoranjan Mahapatra, Radhakrishna Talkies quickly became a beloved cinema hall in Nayagarh, known for its dedication to quality entertainment.</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-black z-10 shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
                <div className="w-5/12">
                   <img src={journey1985} alt="Radhakrishna Talkies legacy hall" className="rounded-xl grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all border border-white/10" />
                </div>
              </div>

              {/* Point 2 */}
              <div className="relative flex items-center justify-between flex-row-reverse">
                <div className="w-5/12 text-left space-y-4">
                  <h3 className="text-2xl font-bold text-red-600">2023</h3>
                  <h4 className="text-xl font-bold">Cinemax Rebranding</h4>
                  <p className="text-gray-400 text-sm">In 2023, under the visionary leadership of Mr. Jeevan Jyoti Mahapatra, the iconic hall was transformed into RadhaKrishna Cinemax. This rebranding, an initiative of JSP Signatures Private Limited, introduced modern amenities while preserving its rich legacy, elevating the movie experience to new heights.</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-black z-10 shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
                <div className="w-5/12">
                   <img src={journey2023} alt="Radhakrishna Cinemax renovated auditorium" className="rounded-xl border border-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

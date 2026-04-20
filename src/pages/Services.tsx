
import React from 'react';
import { MonitorPlay, Layout, Lightbulb, Users, PartyPopper, Briefcase, Mail, Tv, AudioLines, Wind, Popcorn, Sparkles, Armchair, ParkingSquare } from 'lucide-react';
import { useData } from '../context/DataContext';
import { FACILITIES } from '../../constants';

const iconMap: Record<string, any> = {
  MonitorPlay: MonitorPlay,
  Layout: Layout,
  Lightbulb: Lightbulb,
};

const facilityIconMap: Record<string, any> = {
  AudioLines,
  Wind,
  Popcorn,
  Sparkles,
  Armchair,
  ParkingSquare,
};

const Services: React.FC = () => {
  const { services, promos, events } = useData();

  return (
    <div className="animate-in fade-in duration-500">
      <section className="bg-gradient-to-r from-red-600 to-amber-500 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-6">
          <h1 className="text-5xl md:text-7xl font-cinzel font-bold">Premium <span className="text-red-500">Solutions</span></h1>
          <p className="text-gray-300 text-lg md:text-xl font-medium">Elevate your brand or celebration with Nayagarh's finest cinematic venue.</p>
        </div>
      </section>

      <section className="py-24 bg-black overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-red-600/10 px-4 py-2 rounded-full border border-red-600/20 mb-4">
            <Tv className="h-4 w-4 text-red-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-red-500">Currently Playing On Screen</span>
          </div>
          <h2 className="text-4xl font-cinzel font-bold">Ads & <span className="text-red-600">Special Wishes</span></h2>
        </div>

        <div className="relative flex overflow-hidden">
          <div className="flex animate-infinite-scroll gap-8 py-4 whitespace-nowrap">
            {[...promos, ...promos, ...promos].map((promo, idx) => (
              <div key={`${promo.id}-${idx}`} className="flex-shrink-0 w-[320px] md:w-[480px] aspect-video bg-white/5 rounded-3xl border border-white/10 relative overflow-hidden group/card">
                <img src={promo.imageUrl} alt={promo.title} className="w-full h-full object-cover brightness-50 group-hover/card:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <div className={`self-start px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${promo.type === 'WISH' ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20' : 'bg-red-600 text-white shadow-lg shadow-red-600/20'}`}>{promo.type}</div>
                  <h3 className="text-2xl font-bold text-white mb-2 whitespace-normal">{promo.title}</h3>
                  <p className="text-gray-300 text-sm whitespace-normal leading-relaxed line-clamp-2">{promo.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div key={service.id} className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5 hover:border-gold/30 hover:bg-white/[0.07] transition-all group h-full flex flex-col shadow-xl">
                <div className="w-20 h-20 bg-gold/10 text-gold rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform"><Icon className="h-10 w-10" /></div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-8 flex-grow leading-relaxed">{service.description}</p>
                <ul className="space-y-4 mb-10">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center text-xs font-bold text-gray-300 uppercase tracking-widest"><div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 shadow-[0_0_5px_rgba(220,38,38,0.5)]"></div>{f}</li>
                  ))}
                </ul>
                <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-lg active:scale-95">Book Package</button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
              Comfort & Convenience
            </p>
            <h2 className="text-4xl font-cinzel font-bold">
              Cinema <span className="text-red-600">Facilities</span>
            </h2>
            <p className="max-w-3xl mx-auto text-gray-400">
              Beyond the screen, our hall is built to make your visit more comfortable, enjoyable, and family friendly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {FACILITIES.map((facility) => {
              const Icon = facilityIconMap[facility.icon] || Sparkles;

              return (
                <div
                  key={facility.id}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-8 transition-all hover:border-red-600/30 hover:bg-white/[0.08]"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600/10 text-red-500">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{facility.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-gray-400">{facility.description}</p>
                  <ul className="mt-6 space-y-3">
                    {facility.highlights.map((item) => (
                      <li key={item} className="flex items-center text-xs font-bold uppercase tracking-[0.16em] text-gray-300">
                        <div className="mr-3 h-1.5 w-1.5 rounded-full bg-red-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {events.map((event) => (
              <div key={event.id} className="group overflow-hidden rounded-[2.5rem] bg-black border border-white/5 hover:border-red-600/30 transition-all shadow-2xl">
                <div className="h-64 overflow-hidden relative">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
                <div className="p-10 space-y-4">
                  <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
                  <button className="text-red-600 font-black text-xs uppercase tracking-[0.2em] flex items-center group-hover:text-gold transition-colors pt-4">Inquire Now <Mail className="ml-2 h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;


import React from 'react';
import { Ticket, ShieldCheck, Zap, Trophy, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

const iconMap: Record<string, any> = {
  ShieldCheck: ShieldCheck,
  Zap: Zap,
  Trophy: Trophy,
};

const Passes: React.FC = () => {
  const { passes } = useData();

  return (
    <div className="animate-in fade-in duration-500 py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-cinzel font-bold">Monthly <span className="text-red-600">Pass</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            The best way to experience more movies for less. Choose a plan that fits your lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {passes.map((tier) => {
            const Icon = iconMap[tier.icon] || Ticket;
            return (
              <div 
                key={tier.id} 
                className={`relative bg-white/5 p-10 rounded-[2.5rem] border-2 ${tier.popular ? 'border-red-600 shadow-2xl shadow-red-600/10' : 'border-white/10'} transition-all hover:scale-105 hover:bg-white/[0.07] flex flex-col h-full`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-black uppercase py-1.5 px-6 rounded-full tracking-widest">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <Icon className={`h-12 w-12 ${tier.popular ? 'text-red-600' : 'text-gold'} mb-6`} />
                  <h3 className="text-3xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{tier.description}</p>
                </div>
                <div className="mb-10 flex items-baseline gap-1">
                  <span className="text-5xl font-black">{tier.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-4 mb-12 flex-grow">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start text-sm text-gray-300">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all ${
                  tier.popular ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white/10 text-white hover:bg-white/20'
                }`}>
                  Get Started
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-red-600/10 p-12 rounded-[3rem] border border-red-600/20 flex flex-col md:flex-row items-center gap-12">
          <div className="w-24 h-24 bg-red-600 rounded-3xl rotate-12 flex items-center justify-center shrink-0">
            <Ticket className="h-12 w-12 text-white" />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-bold">How it works?</h3>
            <p className="text-gray-400 leading-relaxed">
              Once you purchase a pass, your identity is linked to your phone number. Just show your digital pass or provide your number at the box office to redeem your movie tickets. Valid ID verification required on first visit.
            </p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full font-bold whitespace-nowrap transition-all shadow-xl shadow-red-600/20">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Passes;

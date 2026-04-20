
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useData } from '../context/DataContext';

const Reviews: React.FC = () => {
  const { reviews } = useData();
  
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
            Guest Voices
          </p>
          <h2 className="text-4xl font-cinzel font-bold">
            What Our <span className="text-red-600">Fans</span> Say
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            A dedicated section for the voices of our audience, sharing the experiences that keep them coming back to Radhakrishna Cinemax.
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="min-w-[300px] md:min-w-[360px] lg:min-w-[380px] max-w-[380px] shrink-0 snap-start bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all group relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-white/10 group-hover:text-red-600/20 transition-colors" />
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-red-600/30">
                  <img src={review.userImage} alt={review.userName} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{review.userName}</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < review.rating ? 'text-gold fill-gold' : 'text-gray-600'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-300 italic mb-6 leading-relaxed">
                "{review.comment}"
              </p>

              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;

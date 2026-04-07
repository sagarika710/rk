
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Star, Info, Ticket } from 'lucide-react';
import { useData } from '../context/DataContext';
import BookingModal from '../components/BookingModal';
import { Movie } from '../../types';

const Movies: React.FC = () => {
  const navigate = useNavigate();
  const { movies } = useData();
  const [filter, setFilter] = useState<'all' | 'now' | 'upcoming'>('all');
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

  const isOdiaMovie = (movie: Movie) => {
    const language = movie.language?.toLowerCase() || '';
    const title = movie.title.toLowerCase();
    const description = movie.description.toLowerCase();

    return (
      language === 'odia' ||
      language === 'or' ||
      language.includes('odia') ||
      title.includes('odia') ||
      description.includes('odia')
    );
  };

  const filteredMovies = movies.filter(movie => {
    if (filter === 'now') return movie.isNowShowing;
    if (filter === 'upcoming') return !movie.isNowShowing;
    return true;
  });

  const odiaMovies = filteredMovies.filter(isOdiaMovie);
  const currentOdiaMovies = odiaMovies.filter((movie) => movie.isNowShowing);
  const upcomingOdiaMovies = odiaMovies.filter((movie) => !movie.isNowShowing);
  const otherMovies = filteredMovies.filter((movie) => !isOdiaMovie(movie));

  const openBooking = (movie: any) => {
    setSelectedMovie({
      id: movie.id,
      title: movie.title,
      bookingLink: movie.bookingLink,
    });
  };

  const openMovieDetails = (movieId: string) => {
    navigate(`/movies/${encodeURIComponent(movieId)}`);
  };

  const renderMovieCard = (movie: any) => (
    <div
      key={movie.id}
      role="button"
      tabIndex={0}
      onClick={() => openMovieDetails(movie.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openMovieDetails(movie.id);
        }
      }}
      className="group relative bg-white/5 rounded-[1.5rem] overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 border border-white/5 shadow-2xl flex flex-col cursor-pointer"
    >
      <div className="aspect-[3/4] overflow-hidden relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-[11px] font-black shadow-lg flex items-center">
          <Star className="h-3 w-3 mr-1 fill-white" />
          {movie.rating}
        </div>

        {!movie.isNowShowing && (
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
            <span className="px-4 py-2 bg-gold text-black font-black rounded-full uppercase tracking-[0.2em] text-[10px] shadow-xl">Coming Soon</span>
          </div>
        )}
      </div>

      <div className="p-4 md:p-5 space-y-3 flex-grow flex flex-col">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-2">
            <h2 className="text-lg md:text-xl font-cinzel font-bold text-white group-hover:text-red-600 transition-colors leading-tight">
              {movie.title}
            </h2>
            {movie.language && (
              <span className="inline-flex px-3 py-1 bg-red-600/10 border border-red-600/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-red-400">
                {movie.language === 'or' ? 'Odia' : movie.language}
              </span>
            )}
          </div>
          {movie.duration && (
            <span className="shrink-0 text-gray-400 text-[10px] font-black uppercase flex items-center bg-white/5 px-2 py-1 rounded tracking-tighter">
              <Clock className="h-3 w-3 mr-1" /> {movie.duration}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {movie.genre?.map((g: string) => (
            <span key={g} className="px-2.5 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase text-gray-400 tracking-widest border border-white/5">
              {g}
            </span>
          ))}
        </div>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-2">
          {movie.description}
        </p>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            openMovieDetails(movie.id);
          }}
          className="self-start text-xs font-black uppercase tracking-[0.2em] text-red-400 hover:text-red-300 transition-colors"
        >
          View Details
        </button>

        <div className="mt-auto space-y-4">
          {movie.isNowShowing ? (
            <>
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gold flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-2 text-red-600" /> Today's Shows
                </h4>
                <div className="flex flex-wrap gap-2">
                  {movie.showtimes?.map((time: string) => (
                    <span
                      key={time}
                      className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold text-gray-300"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  openBooking(movie);
                }}
                className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-black uppercase tracking-[0.18em] text-xs shadow-xl shadow-red-600/20 transition-all active:scale-95"
              >
                <Ticket className="h-3.5 w-3.5 mr-2" /> Book Now
              </button>
            </>
          ) : (
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
              <p className="text-gold font-black uppercase tracking-widest text-[10px] flex items-center">
                <Info className="h-3.5 w-3.5 mr-2" /> Release: {movie.releaseDate}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-500">
      <BookingModal
        movie={selectedMovie}
        isOpen={Boolean(selectedMovie)}
        onClose={() => setSelectedMovie(null)}
      />
      <div className="bg-black/60 pt-20 pb-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold">Movie <span className="text-red-600">Schedule</span></h1>
          
          <div className="flex justify-center space-x-4">
            {(['all', 'now', 'upcoming'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest transition-all ${
                  filter === f 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {f === 'now' ? 'Now Showing' : f === 'upcoming' ? 'Upcoming' : 'All Movies'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16">
        {odiaMovies.length > 0 && (
          <section className="mb-20 space-y-8">
            <div className="text-center md:text-left space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
                Featured First
              </p>
              <h2 className="text-4xl font-cinzel font-bold">
                Odia <span className="text-red-600">Movies</span>
              </h2>
              <p className="text-gray-400 max-w-3xl">
                A dedicated section for Odia titles, highlighted first before the rest of the movie lineup.
              </p>
            </div>

            {currentOdiaMovies.length > 0 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    Now Showing
                  </p>
                  <h3 className="text-2xl font-cinzel font-bold text-white">Current Odia Movies</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {currentOdiaMovies.map(renderMovieCard)}
                </div>
              </div>
            )}

            {upcomingOdiaMovies.length > 0 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    Coming Soon
                  </p>
                  <h3 className="text-2xl font-cinzel font-bold text-white">Upcoming Odia Movies</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {upcomingOdiaMovies.map(renderMovieCard)}
                </div>
              </div>
            )}
          </section>
        )}

        {(otherMovies.length > 0 || odiaMovies.length === 0) && (
          <section className="space-y-8">
            <div className="text-center md:text-left space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                {odiaMovies.length > 0 ? 'Full Lineup' : 'No Odia Movies Found'}
              </p>
              <h2 className="text-4xl font-cinzel font-bold">
                {odiaMovies.length > 0 ? 'Other ' : ''}<span className="text-red-600">Movies</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {(odiaMovies.length > 0 ? otherMovies : filteredMovies).map(renderMovieCard)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Movies;

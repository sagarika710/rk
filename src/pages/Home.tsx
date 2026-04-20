import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
  AudioLines,
  Wind,
  Popcorn,
  Sparkles,
  Armchair,
  ParkingSquare,
} from "lucide-react";
import { THEATRE_NAME, LOCATION, FACILITIES } from "../../constants";

import Reviews from "../components/Reviews";
import { getMovies } from "../Api/moviesApi";
import BookingModal from "../components/BookingModal";
import homeBanner from "../assets/Img/home-banner.jpg";

const COMING_SOON_PRIORITY = [
  "Bindusagar",
  "Mantra Muugdha",
  "Dacoit",
  "Bhooth Bangla",
];

const facilityIconMap: Record<string, any> = {
  AudioLines,
  Wind,
  Popcorn,
  Sparkles,
  Armchair,
  ParkingSquare,
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [nowShowing, setNowShowing] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const movies = await getMovies();

      setNowShowing(
        movies.filter((m: any) => m.isNowShowing).slice(0, 3)
      );

      setUpcoming(
        movies
          .filter((m: any) => !m.isNowShowing)
          .sort((a: any, b: any) => {
            const aPriority = COMING_SOON_PRIORITY.indexOf(a.title);
            const bPriority = COMING_SOON_PRIORITY.indexOf(b.title);

            if (aPriority !== -1 || bPriority !== -1) {
              if (aPriority === -1) return 1;
              if (bPriority === -1) return -1;
              return aPriority - bPriority;
            }

            const aDate = a.releaseDate ? new Date(a.releaseDate).getTime() : Number.MAX_SAFE_INTEGER;
            const bDate = b.releaseDate ? new Date(b.releaseDate).getTime() : Number.MAX_SAFE_INTEGER;
            return aDate - bDate;
          })
          .slice(0, 4)
      );
    } catch (err) {
      console.error("Failed to fetch movies", err);
    } finally {
      setLoading(false);
    }
  };

  const openBooking = (movie: any) => {
    setSelectedMovie({
      id: movie._id,
      title: movie.title,
      bookingLink: movie.bookingLink,
    });
  };

  const openMovieDetails = (movieId: string) => {
    navigate(`/movies/${encodeURIComponent(movieId)}`);
  };

  if (loading) {
    return (
      <p className="text-center text-white mt-40">
        Loading movies...
      </p>
    );
  }

  return (
    <div className="relative animate-in fade-in duration-700 bg-black">
      <BookingModal
        movie={selectedMovie}
        isOpen={Boolean(selectedMovie)}
        onClose={() => setSelectedMovie(null)}
      />
      {/* HERO */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={homeBanner}
            alt={`${THEATRE_NAME} auditorium`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-cinzel font-bold">
            {THEATRE_NAME}
          </h1>
          <p className="text-gray-300 max-w-2xl mt-4">
            Experience cinema like never before with 4K projection
            and Dolby Atmos sound.
          </p>

          <div className="flex items-center text-gold mt-4">
            <MapPin className="mr-2 text-red-600" />
            {LOCATION}
          </div>

          <button
            type="button"
            onClick={() => openBooking({ title: "Book Tickets" })}
            className="inline-flex mt-8 bg-red-600 px-10 py-5 rounded-full font-black"
          >
            Book Tickets <ArrowRight className="ml-2" />
          </button>
        </div>
      </section>

      {/* NOW SHOWING */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-cinzel font-bold mb-12">
            Now <span className="text-red-600">Showing</span>
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
            {nowShowing.map((movie) => (
              <div
                key={movie._id}
                role="button"
                tabIndex={0}
                onClick={() => openMovieDetails(movie._id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openMovieDetails(movie._id);
                  }
                }}
                className="min-w-[280px] md:min-w-[340px] lg:min-w-[360px] max-w-[360px] shrink-0 snap-start bg-white/5 rounded-[1.5rem] overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1"
              >
                <img
                  src={movie.posterUrl}
                  className="aspect-[4/3] w-full object-cover object-center"
                />

                <div className="p-4 space-y-3">
                  <h3 className="text-base md:text-lg font-bold leading-snug">{movie.title}</h3>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-300">
                    {movie.language && (
                      <span className="rounded-full bg-red-600/10 px-2.5 py-1 font-bold text-red-400">
                        {movie.language}
                      </span>
                    )}
                    {movie.duration && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3 text-red-500" />
                        {movie.duration}
                      </span>
                    )}
                    {movie.rating && (
                      <span className="rounded-full border border-white/10 px-2.5 py-1 font-bold">
                        {movie.rating}
                      </span>
                    )}
                  </div>

                  {movie.showtimes?.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                        <Calendar className="h-3 w-3 text-red-500" />
                        Today&apos;s Shows
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {movie.showtimes.map((time: string) => (
                          <span
                            key={time}
                            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-gray-200"
                          >
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      openBooking(movie);
                    }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3 text-xs font-black tracking-[0.18em] text-white shadow-xl shadow-red-600/20 transition-all hover:bg-red-700 active:scale-[0.98]"
                  >
                    Book Now <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMING SOON */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-cinzel font-bold mb-12">
            Coming <span className="text-red-600">Soon</span>
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
            {upcoming.map((movie) => (
              <div
                key={movie._id}
                role="button"
                tabIndex={0}
                onClick={() => openMovieDetails(movie._id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openMovieDetails(movie._id);
                  }
                }}
                className="min-w-[220px] md:min-w-[240px] lg:min-w-[260px] max-w-[260px] shrink-0 snap-start bg-white/5 rounded-[1.5rem] overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1"
              >
                <img
                  src={movie.posterUrl}
                  className="aspect-[3/4] w-full object-cover brightness-75"
                />

                <div className="p-4 space-y-2">
                  <h3 className="text-base md:text-lg font-bold leading-snug">{movie.title}</h3>

                  <div className="flex items-center text-[11px] text-red-500 font-bold uppercase tracking-[0.2em]">
                    <Calendar className="mr-2 h-3.5 w-3.5" />
                    Coming Soon
                  </div>

                  {movie.releaseDate && (
                    <p className="text-xs text-gray-400 font-semibold">
                      Release: {new Date(movie.releaseDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-center space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
              Comfort First
            </p>
            <h2 className="text-4xl font-cinzel font-bold">
              Our <span className="text-red-600">Facilities</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              A dedicated section for the amenities and conveniences that make every visit to Radhakrishna Cinemax more comfortable and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {FACILITIES.map((facility, index) => {
              const Icon = facilityIconMap[facility.icon] || Sparkles;

              return (
                <div
                  key={facility.id}
                  style={{ animationDelay: `${index * 120}ms` }}
                  className="group rounded-[1.25rem] border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-2 hover:border-red-600/30 hover:bg-white/[0.08] hover:shadow-xl hover:shadow-red-950/20 animate-in fade-in slide-in-from-bottom-4"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/10 text-red-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600/15">
                    <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug transition-colors duration-300 group-hover:text-red-400">{facility.title}</h3>
                  <p className="mt-2 text-sm leading-5 text-gray-400 line-clamp-3">{facility.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <Reviews />
    </div>
  );
};

export default Home;

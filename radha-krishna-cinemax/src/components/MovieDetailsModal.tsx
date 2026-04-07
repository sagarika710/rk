import React, { useEffect, useState } from "react";
import { Calendar, Clock, ExternalLink, PlayCircle, Star, Ticket, X } from "lucide-react";
import { Movie } from "../../types";

interface MovieDetailsModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (movie: Movie) => void;
}

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const getYouTubeEmbedUrl = (url: string) => {
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
  const videoId = watchMatch?.[1] || shortMatch?.[1] || embedMatch?.[1];

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movie,
  isOpen,
  onClose,
  onBookNow,
}) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  useEffect(() => {
    if (!movie || !isOpen) {
      setTrailerUrl("");
      setLoadingTrailer(false);
      return;
    }

    if (movie.trailerUrl) {
      setTrailerUrl(movie.trailerUrl);
      return;
    }

    if (!movie.id.startsWith("tmdb-")) {
      setTrailerUrl("");
      return;
    }

    const fetchTrailer = async () => {
      try {
        setLoadingTrailer(true);
        const tmdbId = movie.id.replace("tmdb-", "");
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${TMDB_API_KEY}`
        );
        const data = await response.json();
        const trailer = (data.results || []).find(
          (video: any) =>
            video.site === "YouTube" &&
            (video.type === "Trailer" || video.type === "Teaser")
        );
        setTrailerUrl(trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : "");
      } catch (error) {
        console.error("Trailer fetch failed", error);
        setTrailerUrl("");
      } finally {
        setLoadingTrailer(false);
      }
    };

    fetchTrailer();
  }, [movie, isOpen]);

  if (!isOpen || !movie) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[145] bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#080808] shadow-2xl">
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 px-6 pb-8 lg:px-8 lg:pb-10">
            <div className="space-y-5">
              <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-white/5">
                <img src={movie.poster} alt={movie.title} className="w-full aspect-[2/3] object-cover" />
              </div>
              <button
                type="button"
                onClick={() => onBookNow(movie)}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95"
              >
                <Ticket className="h-4 w-4" />
                Book Now
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  {movie.language && (
                    <span className="px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-[10px] font-black uppercase tracking-[0.2em] text-red-400">
                      {movie.language === "or" ? "Odia" : movie.language}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-white" />
                    {movie.rating}
                  </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-cinzel font-bold text-white">{movie.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.genre?.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase text-gray-400 tracking-widest border border-white/5"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Runtime</p>
                  <p className="text-sm font-bold text-white flex items-center gap-2">
                    <Clock className="h-4 w-4 text-red-500" />
                    {movie.duration || "TBA"}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Release</p>
                  <p className="text-sm font-bold text-white flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-red-500" />
                    {movie.isNowShowing ? "Now Showing" : movie.releaseDate || "Coming Soon"}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Shows</p>
                  <p className="text-sm font-bold text-white">
                    {movie.showtimes?.length ? movie.showtimes.join(" • ") : "Schedule not added"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">About the Movie</h3>
                <p className="text-gray-400 leading-relaxed">{movie.description || "Description coming soon."}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold text-white">Trailer</h3>
                  {trailerUrl && (
                    <a
                      href={trailerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-400 hover:text-red-300"
                    >
                      Open Trailer
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>

                <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-black min-h-[260px] flex items-center justify-center">
                  {loadingTrailer ? (
                    <p className="text-gray-500 text-sm">Loading trailer...</p>
                  ) : trailerUrl ? (
                    <iframe
                      src={getYouTubeEmbedUrl(trailerUrl)}
                      title={`${movie.title} trailer`}
                      className="w-full aspect-video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <div className="text-center space-y-3 px-6">
                      <PlayCircle className="h-12 w-12 text-red-500 mx-auto" />
                      <p className="text-white font-bold">Trailer not available yet</p>
                      <p className="text-gray-500 text-sm">
                        Add a trailer URL from admin for local movies, or TMDb will provide one when available.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;

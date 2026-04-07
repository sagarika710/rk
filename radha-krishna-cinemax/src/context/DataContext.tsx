import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Movie,
  ServiceItem,
  FAQ,
  EventOption,
  Review,
  PromoItem,
  ChatbotOption,
  PassTier,
} from "../types";

import {
  ADVERTISING_SERVICES,
  EVENTS,
} from "../../constants";

import { getActivePromos } from "../Api//promosApi";
import { getReviews } from "../Api//reviewsApi";
import { getFaqs } from "../Api//faqsApi";
import { getPasses } from "../Api//passesApi";
import { getMovies } from "../Api/moviesApi";
import { getChatbotOptions } from "../Api/chatbotApi";
import { getEvents } from "../Api/eventsApi";
import { getServices } from "../Api/servicesApi";

/* ===================== ENV ===================== */
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

/* ===================== TMDB GENRE MAP ===================== */
const GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const mapTmdbMovie = (m: any): Movie => ({
  id: `tmdb-${m.id}`,
  title: m.title,
  poster: m.poster_path
    ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
    : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
  rating: typeof m.vote_average === "number" ? `${m.vote_average.toFixed(1)}/10` : "N/A",
  genre: (m.genre_ids || []).map((id: number) => GENRE_MAP[id] || "Other"),
  language: m.original_language || "",
  description: m.overview || "",
  releaseDate: m.release_date,
  isNowShowing: false,
  trailerUrl: "",
});

const isFutureRelease = (releaseDate?: string) => {
  if (!releaseDate) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const release = new Date(releaseDate);
  if (Number.isNaN(release.getTime())) {
    return false;
  }

  return release >= today;
};

/* ===================== CHATBOT (STATIC) ===================== */
const CHATBOT_OPTIONS: ChatbotOption[] = [
  {
    id: "1",
    label: "Now Showing",
    response:
      "We are currently screening the latest blockbusters. Visit the Movies page for show timings.",
  },
  {
    id: "2",
    label: "How to Book",
    response:
      "You can book tickets online via BookMyShow or directly at our box office.",
  },
  {
    id: "3",
    label: "Monthly Pass",
    response:
      "We offer Silver, Gold and Platinum monthly passes with great benefits.",
  },
  {
    id: "4",
    label: "Location",
    response:
      "We are located at Khandapada Rd, Nayagarh, Odisha 752069.",
  },
  {
    id: "5",
    label: "Snacks & Cafe",
    response:
      "We serve fresh popcorn, samosas, burgers and cold drinks. Outside food is not allowed.",
  },
];

/* ===================== CONTEXT TYPE ===================== */
interface DataContextType {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  services: ServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  promos: PromoItem[];
  setPromos: React.Dispatch<React.SetStateAction<PromoItem[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  faqs: FAQ[];
  setFaqs: React.Dispatch<React.SetStateAction<FAQ[]>>;
  events: EventOption[];
  setEvents: React.Dispatch<React.SetStateAction<EventOption[]>>;
  passes: PassTier[];
  setPasses: React.Dispatch<React.SetStateAction<PassTier[]>>;
  chatbotOptions: ChatbotOption[];
  setChatbotOptions: React.Dispatch<React.SetStateAction<ChatbotOption[]>>;
  resetData: () => void;
}

/* ===================== CONTEXT ===================== */
const DataContext = createContext<DataContextType | undefined>(undefined);

/* ===================== PROVIDER ===================== */
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [promos, setPromos] = useState<PromoItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [passes, setPasses] = useState<PassTier[]>([]);
  const [services, setServices] = useState<ServiceItem[]>(ADVERTISING_SERVICES);
  const [events, setEvents] = useState<EventOption[]>(EVENTS);
  const [chatbotOptions, setChatbotOptions] = useState<ChatbotOption[]>(CHATBOT_OPTIONS);

  /* ===================== MOVIES ===================== */
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const backendMovies = await getMovies();

        const localMovies: Movie[] = backendMovies.map((m: any) => ({
          id: m._id,
          title: m.title,
          poster: m.posterUrl,
          rating: m.rating,
          genre: m.genre,
          language: m.language || "",
          description: m.description || "",
          trailerUrl: m.trailerUrl || "",
          releaseDate: m.releaseDate
            ? new Date(m.releaseDate).toISOString().slice(0, 10)
            : "",
          duration: m.duration || "",
          showtimes: m.showtimes || [],
          bookingLink: m.bookingLink,
          isNowShowing: Boolean(m.isNowShowing),
        }));

        const tmdbRes = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&region=IN`
        );
        const tmdbData = await tmdbRes.json();

        const odiaRes = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=or&sort_by=primary_release_date.asc&primary_release_date.gte=${new Date().toISOString().slice(0, 10)}&primary_release_date.lte=2027-12-31&region=IN`
        );
        const odiaData = await odiaRes.json();

        const upcoming: Movie[] = (tmdbData.results || []).map(mapTmdbMovie);
        const odiaMovies: Movie[] = (odiaData.results || [])
          .map((m: any) => ({
            ...mapTmdbMovie(m),
            language: "Odia",
          }))
          .filter((movie) => isFutureRelease(movie.releaseDate));

        const mergedMovies = [...localMovies, ...odiaMovies, ...upcoming].filter(
          (movie, index, arr) =>
            arr.findIndex(
              (candidate) =>
                candidate.id === movie.id ||
                candidate.title.toLowerCase() === movie.title.toLowerCase()
            ) === index
        );

        setMovies(mergedMovies);
      } catch (e) {
        console.error("Movies fetch failed", e);
      }
    };

    fetchMovies();
  }, []);

  /* ===================== SERVICES ===================== */
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        if (data.length) {
          setServices(
            data.map((service: any) => ({
              id: service._id,
              title: service.title,
              description: service.description,
              icon: service.icon,
              features: service.features || [],
            }))
          );
        }
      } catch (e) {
        console.error("Services fetch failed", e);
      }
    };

    fetchServices();
  }, []);

  /* ===================== EVENTS ===================== */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        if (data.length) {
          setEvents(
            data.map((event: any) => ({
              id: event._id,
              title: event.title,
              description: event.description,
              image: event.image,
            }))
          );
        }
      } catch (e) {
        console.error("Events fetch failed", e);
      }
    };

    fetchEvents();
  }, []);

  /* ===================== PROMOS ===================== */
  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const data = await getActivePromos();
        setPromos(
          data.map((p: any) => ({
            id: p._id,
            title: p.title,
            imageUrl: p.imageUrl,
            type: p.type,
            content: p.content,
          }))
        );
      } catch (e) {
        console.error("Promos fetch failed", e);
      }
    };

    fetchPromos();
  }, []);

  /* ===================== CHATBOT ===================== */
  useEffect(() => {
    const fetchChatbot = async () => {
      try {
        const data = await getChatbotOptions();
        if (data.length) {
          setChatbotOptions(
            data.map((option: any) => ({
              id: option._id,
              label: option.label,
              response: option.response,
            }))
          );
        }
      } catch (e) {
        console.error("Chatbot fetch failed", e);
      }
    };

    fetchChatbot();
  }, []);

  /* ===================== REVIEWS ===================== */
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(
          data.map((r: any) => ({
            id: r._id,
            userName: r.userName,
            userImage: r.userImage,
            rating: r.rating,
            comment: r.comment,
            date: r.createdAt
              ? new Date(r.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "",
          }))
        );
      } catch (e) {
        console.error("Reviews fetch failed", e);
      }
    };

    fetchReviews();
  }, []);

  /* ===================== FAQS ===================== */
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getFaqs();
        setFaqs(
          data.map((f: any) => ({
            id: f._id,
            question: f.question,
            answer: f.answer,
          }))
        );
      } catch (e) {
        console.error("FAQs fetch failed", e);
      }
    };

    fetchFaqs();
  }, []);

  /* ===================== PASSES ===================== */
  useEffect(() => {
    const fetchPasses = async () => {
      try {
        const data = await getPasses();
        setPasses(
          data.map((p: any) => ({
            id: p._id,
            name: p.name,
            price: p.price,
            description: p.description,
            icon: p.icon,
            popular: p.popular,
            features: p.features,
          }))
        );
      } catch (e) {
        console.error("Passes fetch failed", e);
      }
    };

    fetchPasses();
  }, []);

  /* ===================== RESET ===================== */
  const resetData = () => {
    setMovies([]);
    setPromos([]);
    setReviews([]);
    setFaqs([]);
    setPasses([]);
    localStorage.clear();
  };

  return (
    <DataContext.Provider
      value={{
        movies,
        setMovies,
        services,
        setServices,
        promos,
        setPromos,
        reviews,
        setReviews,
        faqs,
        setFaqs,
        events,
        setEvents,
        passes,
        setPasses,
        chatbotOptions,
        setChatbotOptions,
        resetData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

/* ===================== HOOK ===================== */
export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useData must be used inside DataProvider");
  }
  return ctx;
};

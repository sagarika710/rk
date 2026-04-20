
export interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: string;
  genre: string[];
  language?: string;
  releaseDate: string;
  duration?: string;
  description: string;
  cast?: string[];
  isNowShowing: boolean;
  showtimes?: string[];
  bookingLink?: string;
  trailerUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface EventOption {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Review {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
}

export interface PromoItem {
  id: string;
  type: 'AD' | 'WISH';
  content: string;
  imageUrl: string;
  title: string;
}

export interface ChatbotOption {
  id: string;
  label: string;
  response: string;
}

export interface PassTier {
  id: string;
  name: string;
  price: string;
  description: string;
  icon: string;
  features: string[];
  popular?: boolean;
}


import { Movie, ServiceItem, FAQ, EventOption, Review, PromoItem } from './types';

export const THEATRE_NAME = "Radhakrishna Cinemax";
export const LOCATION = "Khandapada Rd, Nayagarh, Odisha 752069";
export const BOOKMYSHOW_URL = "https://in.bookmyshow.com/explore/movies-nayagarh";

export const MOVIES: Movie[] = [
  {
    id: "1",
    title: "Chavva",
    poster: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop",
    rating: "9.5/10",
    genre: ["Action", "History", "Drama"],
    releaseDate: "Now Showing",
    duration: "2h 45m",
    description: "An epic historical drama following the life of Sambhaji Maharaj.",
    cast: ["Vicky Kaushal", "Rashmika Mandanna"],
    isNowShowing: true,
    showtimes: ["10:30 AM", "01:45 PM", "05:00 PM", "08:30 PM"]
  },
  {
    id: "2",
    title: "Raid 2",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop",
    rating: "Expected 9.0/10",
    genre: ["Action", "Crime"],
    releaseDate: "Releasing May 1st, 2025",
    description: "Amay Patnaik is back to confront a new corrupt nexus.",
    cast: ["Ajay Devgn", "Vaani Kapoor", "Riteish Desukh"],
    isNowShowing: false
  },
  {
    id: "3",
    title: "Sky Force",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop",
    rating: "N/A",
    genre: ["War", "Action"],
    releaseDate: "Coming Soon",
    description: "A high-octane aerial action thriller based on true events.",
    cast: ["Akshay Kumar", "Sara Ali Khan"],
    isNowShowing: false
  }
];

export const ADVERTISING_SERVICES: ServiceItem[] = [
  {
    id: "ads-1",
    title: "On-Screen Branding",
    description: "Captivate your audience with high-impact video ads and slides played on the big screen before every show.",
    icon: "MonitorPlay",
    features: ["Gold Spot (Interval)", "Silver Spot (Pre-show)", "Logo Branding"]
  },
  {
    id: "ads-2",
    title: "Off-Screen Branding",
    description: "Physical presence in the lobby and outdoor areas for maximum reach.",
    icon: "Layout",
    features: ["Hoardings", "Standees", "Wall Wraps", "Ticket Counter Branding"]
  },
  {
    id: "ads-3",
    title: "Innovative Media",
    description: "Engage visitors through interactive and creative placements.",
    icon: "Lightbulb",
    features: ["Seat Covers", "Restroom Branding", "Backlit Translights"]
  }
];

export const FACILITIES = [
  {
    id: "fac-1",
    title: "Dolby Digital Sound",
    description: "Immersive surround sound engineered to make every dialogue, score, and action sequence feel powerful.",
    icon: "AudioLines",
    highlights: ["High-clarity audio", "Balanced hall acoustics", "Cinematic surround experience"],
  },
  {
    id: "fac-2",
    title: "Air-Conditioned Auditorium",
    description: "A fully air-conditioned hall designed for a comfortable movie experience in every season.",
    icon: "Wind",
    highlights: ["Cool interior climate", "Comfortable seating zone", "Pleasant ambience throughout shows"],
  },
  {
    id: "fac-3",
    title: "Food Court & Snacks",
    description: "Fresh popcorn, beverages, and quick bites available for families, friends, and movie lovers.",
    icon: "Popcorn",
    highlights: ["Fresh snacks", "Beverages available", "Family-friendly food options"],
  },
  {
    id: "fac-4",
    title: "Clean Washrooms",
    description: "Regularly maintained washroom facilities to keep your cinema visit comfortable and hassle-free.",
    icon: "Sparkles",
    highlights: ["Hygienic upkeep", "Regular cleaning", "Convenient access"],
  },
  {
    id: "fac-5",
    title: "Comfortable Seating",
    description: "Well-spaced seating with a clear view of the screen for a relaxed and enjoyable movie session.",
    icon: "Armchair",
    highlights: ["Comfort-focused design", "Good viewing angles", "Suitable for long screenings"],
  },
  {
    id: "fac-6",
    title: "Easy Parking",
    description: "Convenient parking support for visitors arriving on both two-wheelers and four-wheelers.",
    icon: "ParkingSquare",
    highlights: ["Visitor-friendly access", "Two-wheeler support", "Four-wheeler support"],
  },
];

// Added missing id fields to EventOption objects to resolve type errors
export const EVENTS: EventOption[] = [
  {
    id: "ev-1",
    title: "Birthday Celebrations",
    description: "Make your birthday unforgettable with a private screening and customized decor.",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=2036&auto=format&fit=crop"
  },
  {
    id: "ev-2",
    title: "Corporate Bookings",
    description: "Perfect for seminars, presentations, and team outings with full technical support.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop"
  },
  {
    id: "ev-3",
    title: "Private Screening",
    description: "Book the entire hall for your family and friends for a premium experience.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    userName: "Rahul Sharma",
    userImage: "https://i.pravatar.cc/150?u=rahul",
    rating: 5,
    comment: "The sound system at RK Cinemax is truly phenomenal. The Dolby Atmos experience in Nayagarh is unmatched. Definitely the best theatre in town!",
    date: "2 days ago"
  },
  {
    id: "r2",
    userName: "Anjali Mishra",
    userImage: "https://i.pravatar.cc/150?u=anjali",
    rating: 4,
    comment: "Loved the recliner seats! Super comfortable and clean. The snacks are a bit pricey but the quality is great. Highly recommended for family outings.",
    date: "1 week ago"
  },
  {
    id: "r3",
    userName: "Sanjay Das",
    userImage: "https://i.pravatar.cc/150?u=sanjay",
    rating: 5,
    comment: "The staff is very polite and the entry process is smooth. Re-branding has really elevated the level of this theatre. Keep it up!",
    date: "3 weeks ago"
  }
];

export const PROMO_ITEMS: PromoItem[] = [
  {
    id: "p1",
    type: "WISH",
    title: "Happy Birthday Amit!",
    content: "Wishing you a cinematic year ahead from your friends!",
    imageUrl: "https://images.unsplash.com/photo-1530103862676-fa3902b7bbc9?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "p2",
    type: "AD",
    title: "City Jewelers",
    content: "Visit us for the latest collection in gold and diamond. Shop Now!",
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "p3",
    type: "WISH",
    title: "Happy Anniversary!",
    content: "Happy 10th Anniversary to Mr. & Mrs. Mahapatra!",
    imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "p4",
    type: "AD",
    title: "New Spice Restaurant",
    content: "The best Tandoori in town is now open at Nayagarh Main Road.",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
  }
];

export const FAQS: FAQ[] = [
  {
    question: "Do you have parking facilities?",
    answer: "Yes, we provide ample free parking space for both two-wheelers and four-wheelers."
  },
  {
    question: "How can I book tickets online?",
    answer: "You can book tickets through BookMyShow or directly at our box office counter."
  },
  {
    question: "Are outside food and drinks allowed?",
    answer: "No, outside food and drinks are not allowed. We have a cafeteria serving high-quality snacks and beverages."
  },
  {
    question: "What is the Monthly Pass policy?",
    answer: "The monthly pass allows you to watch up to 4 movies in a month at a discounted rate. Visit our box office for registration."
  }
];

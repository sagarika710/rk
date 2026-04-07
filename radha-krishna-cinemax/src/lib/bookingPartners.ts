export type BookingPlatform = "bookmyshow" | "district";

export interface BookingMovie {
  id?: string;
  title: string;
  bookingLink?: string;
}

export const HALL_NAME = "Radhakrishna Cinemax: Nayagarh";
export const BOOKMYSHOW_HALL_URL =
  "https://in.bookmyshow.com/cinemas/nayagarh/radhakrishna-cinemax-nayagarh/buytickets/RCXN/20260407";
export const DISTRICT_MOVIES_URL =
  "https://www.district.in/movies/radhakrishna-cinemax-nayagarh-in-nayagarh-CD1102161";

export const getPartnerLabel = (platform: BookingPlatform) =>
  platform === "bookmyshow" ? "BookMyShow" : "District";

export const getPartnerBookingUrl = (
  platform: BookingPlatform,
  movie?: BookingMovie
) => {
  const bookingLink = movie?.bookingLink?.trim();

  if (platform === "bookmyshow") {
    if (bookingLink && bookingLink.includes("bookmyshow")) {
      return bookingLink;
    }
    return BOOKMYSHOW_HALL_URL;
  }

  if (bookingLink && bookingLink.includes("district")) {
    return bookingLink;
  }

  return DISTRICT_MOVIES_URL;
};

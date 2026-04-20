import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  BookingMovie,
  BookingPlatform,
  HALL_NAME,
  getPartnerBookingUrl,
  getPartnerLabel,
} from "../lib/bookingPartners";
import bookMyShowLogo from "../assets/Img/bookmyshow-logo.png";
import districtLogo from "../assets/Img/district-logo.svg";

interface BookingModalProps {
  movie?: BookingMovie | null;
  isOpen: boolean;
  onClose: () => void;
}

const partnerDescriptions: Record<BookingPlatform, string> = {
  bookmyshow: `${HALL_NAME} preselected when supported by the booking link.`,
  district:
    "Opens District inside the app flow. Add an exact District hall/show link later for direct hall selection.",
};

const partnerLogos: Record<BookingPlatform, string> = {
  bookmyshow: bookMyShowLogo,
  district: districtLogo,
};

const BookingModal: React.FC<BookingModalProps> = ({ movie, isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const openPlatform = (platform: BookingPlatform) => {
    const title = movie?.title || "Book Tickets";
    const url = getPartnerBookingUrl(platform, movie || undefined);

    if (platform === "bookmyshow") {
      window.open(url, "_blank", "noopener,noreferrer");
      onClose();
      return;
    }

    navigate(
      `/booking/partner?platform=${encodeURIComponent(platform)}&title=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between p-6 border-b border-white/10">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-black">
              Select Booking Partner
            </p>
            <h2 className="text-3xl font-cinzel font-bold text-white">
              {movie?.title || "Book Tickets"}
            </h2>
            <p className="text-sm text-gray-400">
              Tickets for <span className="text-white font-semibold">{HALL_NAME}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {(["bookmyshow", "district"] as BookingPlatform[]).map((platform) => (
            <button
              key={platform}
              onClick={() => openPlatform(platform)}
              className="text-left rounded-[1.5rem] border border-white/10 bg-white/5 hover:border-red-600/40 hover:bg-white/[0.08] transition-all p-6"
            >
              <div className="mb-5 flex h-16 items-center rounded-[1.25rem] border border-white/10 bg-black/40 px-4">
                <img
                  src={partnerLogos[platform]}
                  alt={`${getPartnerLabel(platform)} logo`}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {getPartnerLabel(platform)}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {partnerDescriptions[platform]}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

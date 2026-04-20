import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Ticket } from "lucide-react";
import { HALL_NAME, getPartnerLabel } from "../lib/bookingPartners";

const BookingPartner: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const platform = (params.get("platform") || "bookmyshow") as "bookmyshow" | "district";
  const title = params.get("title") || "Book Tickets";
  const url = params.get("url") || "";
  const isEmbeddedPlatform = platform === "district";

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-black">
                Booking Partner
              </p>
              <h1 className="text-4xl font-cinzel font-bold text-white">
                {getPartnerLabel(platform)}
              </h1>
              <p className="text-gray-300">
                Booking for <span className="font-semibold text-white">{title}</span> at{" "}
                <span className="font-semibold text-white">{HALL_NAME}</span>
              </p>
            </div>

          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[#020202] overflow-hidden shadow-2xl shadow-black/40">
          {url && isEmbeddedPlatform ? (
            <iframe
              key={url}
              src={url}
              title={`${getPartnerLabel(platform)} booking`}
              className="w-full h-[70vh] bg-[#020202]"
              style={{ colorScheme: "dark" }}
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="h-[50vh] flex items-center justify-center p-8 text-center">
              <div className="space-y-4 max-w-xl">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-red-600/10 text-red-500 flex items-center justify-center">
                  <Ticket className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {isEmbeddedPlatform ? "Booking Link Needed" : "BookMyShow Opens in a New Tab"}
                </h2>
                <p className="text-gray-400">
                  {isEmbeddedPlatform
                    ? "This partner does not have a direct embedded booking link configured yet. Use the button above to continue."
                    : "BookMyShow blocks embedded booking pages, so use the button above to continue in a new tab and then return here after booking."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPartner;

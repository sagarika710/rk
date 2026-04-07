import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Ticket } from "lucide-react";
import { HALL_NAME, getPartnerLabel } from "../lib/bookingPartners";

const BookingThanks: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const platform = (params.get("platform") || "bookmyshow") as "bookmyshow" | "district";
  const title = params.get("title") || "your movie";

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-16 flex items-center">
      <div className="max-w-3xl mx-auto px-4 w-full">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 md:p-14 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-500/15 text-green-400 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-black">
              Booking Return
            </p>
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-white">
              Thank You
            </h1>
            <p className="text-gray-300 text-lg">
              Hope your booking for <span className="font-semibold text-white">{title}</span> at{" "}
              <span className="font-semibold text-white">{HALL_NAME}</span> was completed
              successfully on <span className="font-semibold text-white">{getPartnerLabel(platform)}</span>.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 text-left">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-600/10 text-red-500 flex items-center justify-center shrink-0">
                <Ticket className="h-6 w-6" />
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Please keep your ticket or booking confirmation from {getPartnerLabel(platform)} ready at entry.</p>
                <p>If anything looked incomplete, go back to the partner page and finish the booking there.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/movies"
              className="inline-flex items-center justify-center rounded-2xl bg-red-600 hover:bg-red-700 px-6 py-4 text-xs font-black uppercase tracking-widest text-white transition-all"
            >
              Browse More Movies
            </Link>
            <Link
              to="/support"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-4 text-xs font-black uppercase tracking-widest text-white transition-all"
            >
              Need Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingThanks;

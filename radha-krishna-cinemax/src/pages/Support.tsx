
import React, { useState } from 'react';
import {  LOCATION } from '../../constants';
import { ChevronDown, ChevronUp, MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const QUERY_EMAIL = 'radhakrishnacinemax@gmail.com';

const Support: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit query');
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit query');
    } finally {
      setIsSubmitting(false);
    }
  };
  const { services, faqs } = useData();
  return (
    <div className="animate-in fade-in duration-500 pb-24">
      {/* Header */}
      <section className="bg-[#0a0a0a] py-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-cinzel font-bold">Help <span className="text-red-600">&</span> Support</h1>
          <p className="text-gray-400 text-lg">We're here to assist you. Find answers or get in touch with our team.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* FAQ Section */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-cinzel font-bold mb-4">Frequently Asked <span className="text-red-600">Questions</span></h2>
              <div className="w-16 h-1 bg-red-600"></div>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-6 flex justify-between items-center text-left hover:bg-white/5 transition-all"
                  >
                    <span className="font-bold text-gray-200">{faq.question}</span>
                    {openFaq === idx ? <ChevronUp className="h-5 w-5 text-red-600" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                  </button>
                  {openFaq === idx && (
                    <div className="p-6 pt-0 text-gray-400 border-t border-white/5 animate-in slide-in-from-top-4 duration-300">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-cinzel font-bold mb-4">Send us a <span className="text-red-600">Query</span></h2>
              <div className="w-16 h-1 bg-red-600"></div>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              {isSubmitted ? (
                <div className="py-20 text-center space-y-4 animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold">Message Sent!</h3>
                  <p className="text-gray-400">Thank you for reaching out. Your query has been sent to {QUERY_EMAIL} and our team will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                      <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
                      <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-all" placeholder="+91" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                    <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-all" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Subject</label>
                    <select name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-all">
                      <option>General Inquiry</option>
                      <option>Advertising Enquiry</option>
                      <option>Corporate Booking</option>
                      <option>Monthly Pass Query</option>
                      <option>Feedback</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Message</label>
                    <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-all" placeholder="How can we help you?"></textarea>
                  </div>
                  {error && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}
                  <button disabled={isSubmitting} type="submit" className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center transition-all">
                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="ml-2 h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Location Section */}
        <section className="mt-32 space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-cinzel font-bold mb-4">Find <span className="text-red-600">Us</span></h2>
            <div className="flex items-center justify-center text-gray-400 mb-8">
              <MapPin className="h-5 w-5 text-red-600 mr-2" />
              {LOCATION}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-white/10 h-[450px] shadow-2xl">
               {/* Embed Google Map for the specified location */}
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3744.492166649887!2d85.10512837580623!3d20.129068018247072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19001b6e41710b%3A0xc3f6d7e6c467657d!2sRadha%20Krishna%20Cinemax!5e0!3m2!1sen!2sin!4v1709456321234!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
               ></iframe>
             </div>
             <div className="space-y-6">
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 h-full">
                  <h4 className="text-xl font-bold mb-6">Contact Info</h4>
                  <div className="space-y-8">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center shrink-0">
                        <Phone className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Call Us</p>
                        <p className="text-lg font-bold">+91 98765 43210</p>
                        <p className="text-sm text-gray-400">+91 6753 234567</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center shrink-0">
                        <Mail className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Us</p>
                        <p className="max-w-full text-base sm:text-lg font-bold break-all leading-relaxed">{QUERY_EMAIL}</p>
                        <p className="text-sm text-gray-400 leading-relaxed">Queries from the support form will be sent here.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Visit Us</p>
                        <p className="text-lg font-bold">Nayagarh Town</p>
                        <p className="text-sm text-gray-400">Odisha, 752069</p>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Support;


import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Film, MessageSquare, Tv, HelpCircle, 
  Plus, Trash2, Edit3, LogOut, Ticket, Sparkles, LayoutGrid, Info, X, Save, Star
} from 'lucide-react';

import {
  adminLogin,
  createMovie,
  updateMovie,
  deleteMovie,
  createPromo,
  updatePromo,
  deletePromo,
  createFaq,
  updateFaq,
  deleteFaq,
  createPass,
  updatePass,
  deletePass,
  createChatbot,
  updateChatbot,
  deleteChatbot,
  createEvent,
  updateEvent,
  deleteEvent,
  createService,
  updateService,
  deleteService,
  deleteReview
} from "@/src/Api/adminApi";



const AdminPanel: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'movies' | 'promos' | 'reviews' | 'faqs' | 'passes' | 'chatbot' | 'events' | 'services'>('movies');
  const { 
    movies, setMovies, 
    promos, setPromos, 
    reviews, setReviews, 
    faqs, setFaqs, 
    passes, setPasses,
    chatbotOptions, setChatbotOptions,
    events, setEvents,
    services, setServices,
    resetData 
  } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await adminLogin("admin", password);

    // Save token
    localStorage.setItem("admin_token", res.token);

    setIsLoggedIn(true);
    setPassword("");
  } catch (err: any) {
    alert(err.message || "Invalid credentials");
  }
};

  const openAddModal = () => {
    let newItem: any = { id: Date.now().toString() };
    if (activeTab === 'movies') newItem = { ...newItem, title: '', poster: '', rating: '', language: '', genre: [], description: '', trailerUrl: '', cast: [], isNowShowing: true, showtimes: [] };
    if (activeTab === 'passes') newItem = { ...newItem, name: '', price: '', description: '', icon: 'Zap', features: [], popular: false };
    if (activeTab === 'chatbot') newItem = { ...newItem, label: '', response: '' };
    if (activeTab === 'events') newItem = { ...newItem, title: '', description: '', image: '' };
    if (activeTab === 'promos') newItem = { ...newItem, type: 'AD', title: '', content: '', imageUrl: '' };
    if (activeTab === 'faqs') newItem = { question: '', answer: '' };
    if (activeTab === 'reviews') newItem = { ...newItem, userName: '', userImage: 'https://i.pravatar.cc/150', rating: 5, comment: '', date: new Date().toLocaleDateString() };
    if (activeTab === 'services') newItem = { ...newItem, title: '', description: '', icon: 'MonitorPlay', features: [] };
    
    setEditingItem(newItem);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

const saveItem = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (activeTab === "movies") {
      editingItem._id
        ? await updateMovie(editingItem._id, editingItem)
        : await createMovie(editingItem);
    }

    if (activeTab === "promos") {
      editingItem._id
        ? await updatePromo(editingItem._id, editingItem)
        : await createPromo(editingItem);
    }

    if (activeTab === "faqs") {
      editingItem._id
        ? await updateFaq(editingItem._id, editingItem)
        : await createFaq(editingItem);
    }

    if (activeTab === "passes") {
      editingItem._id
        ? await updatePass(editingItem._id, editingItem)
        : await createPass(editingItem);
    }

    if (activeTab === "chatbot") {
      editingItem._id
        ? await updateChatbot(editingItem._id, editingItem)
        : await createChatbot(editingItem);
    }

    if (activeTab === "events") {
      editingItem._id
        ? await updateEvent(editingItem._id, editingItem)
        : await createEvent(editingItem);
    }

    if (activeTab === "services") {
      editingItem._id
        ? await updateService(editingItem._id, editingItem)
        : await createService(editingItem);
    }

    alert("Saved successfully");
    window.location.reload(); // keeps UI simple & safe
  } catch (err: any) {
    alert(err.message || "Save failed");
  } finally {
    setIsModalOpen(false);
    setEditingItem(null);
  }
};

const deleteItem = async (id: string) => {
  if (!window.confirm("Are you sure? This cannot be undone.")) return;

  try {
    if (activeTab === "movies") await deleteMovie(id);
    if (activeTab === "promos") await deletePromo(id);
    if (activeTab === "faqs") await deleteFaq(id);
    if (activeTab === "passes") await deletePass(id);
    if (activeTab === "chatbot") await deleteChatbot(id);
    if (activeTab === "events") await deleteEvent(id);
    if (activeTab === "services") await deleteService(id);
    if (activeTab === "reviews") await deleteReview(id);

    alert("Deleted successfully");
    window.location.reload();
  } catch (err: any) {
    alert(err.message || "Delete failed");
  }
};

  

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <form onSubmit={handleLogin} className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-cinzel font-bold text-white">Admin <span className="text-red-600">Login</span></h1>
            <p className="text-gray-500 text-sm">Enter credentials to manage RK Cinemax</p>
          </div>
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-red-600 outline-none transition-all"
          />
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all">
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-white/10 p-6 flex flex-col space-y-8 sticky top-0 h-screen">
        <div className="font-cinzel font-bold text-xl tracking-tighter">
          RK <span className="text-red-600">ADMIN</span>
        </div>
        
        <nav className="flex-grow space-y-1 overflow-y-auto no-scrollbar">
          <SidebarItem icon={<Film className="h-4 w-4" />} label="Movies" active={activeTab === 'movies'} onClick={() => setActiveTab('movies')} />
          <SidebarItem icon={<Ticket className="h-4 w-4" />} label="Monthly Pass" active={activeTab === 'passes'} onClick={() => setActiveTab('passes')} />
          <SidebarItem icon={<Tv className="h-4 w-4" />} label="Promotions/Ads" active={activeTab === 'promos'} onClick={() => setActiveTab('promos')} />
          <SidebarItem icon={<Sparkles className="h-4 w-4" />} label="Events/Hall" active={activeTab === 'events'} onClick={() => setActiveTab('events')} />
          <SidebarItem icon={<LayoutGrid className="h-4 w-4" />} label="Services" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
          <SidebarItem icon={<MessageSquare className="h-4 w-4" />} label="Chatbot Q&A" active={activeTab === 'chatbot'} onClick={() => setActiveTab('chatbot')} />
          <SidebarItem icon={<Info className="h-4 w-4" />} label="Reviews" active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} />
          <SidebarItem icon={<HelpCircle className="h-4 w-4" />} label="FAQs" active={activeTab === 'faqs'} onClick={() => setActiveTab('faqs')} />
        </nav>

        <div className="space-y-4 pt-8 border-t border-white/10">
          <button onClick={resetData} className="w-full text-xs text-gray-600 hover:text-red-500 flex items-center justify-center space-x-2">
            <span className="p-1">↺</span> <span>Reset Factory Data</span>
          </button>
          <button onClick={() => setIsLoggedIn(false)} className="w-full bg-white/5 hover:bg-red-600/10 text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2">
            <LogOut className="h-3 w-3" /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-cinzel font-bold capitalize">{activeTab.replace('_', ' ')} Control</h2>
            <p className="text-gray-500 text-sm">Real-time management for the public website</p>
          </div>
          <button 
            onClick={openAddModal}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center space-x-2 shadow-lg shadow-red-600/20 active:scale-95 transition-all"
          >
            <Plus className="h-4 w-4" /> <span>Add New {activeTab.slice(0, -1)}</span>
          </button>
        </header>

        <div className="bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Reference</th>
                <th className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Primary Info</th>
                <th className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Details/Status</th>
                <th className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {activeTab === 'movies' && movies.map(movie => (
                <tr key={movie.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">{movie.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img src={movie.poster} className="h-12 w-9 object-cover rounded shadow-lg" />
                      <div>
                        <p className="font-bold text-white">{movie.title}</p>
                        <p className="text-[10px] text-gray-500 uppercase font-black">{movie.genre?.join(' • ') || 'No Genre'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><StatusBadge label={movie.isNowShowing ? 'Now Showing' : 'Upcoming'} type={movie.isNowShowing ? 'success' : 'warning'} /></td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <ActionButton icon={<Edit3 className="h-4 w-4" />} onClick={() => openEditModal(movie)} />
                    <ActionButton icon={<Trash2 className="h-4 w-4" />} type="danger" onClick={() => deleteItem(movie.id)} />
                  </td>
                </tr>
              ))}

              {activeTab === 'passes' && passes.map(pass => (
                <tr key={pass.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">{pass.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-white">{pass.name}</p>
                      <p className="text-xl text-red-600 font-black">{pass.price}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-400">{pass.features?.length || 0} Features Included</p>
                    {pass.popular && <StatusBadge label="Popular" type="success" />}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <ActionButton icon={<Edit3 className="h-4 w-4" />} onClick={() => openEditModal(pass)} />
                    <ActionButton icon={<Trash2 className="h-4 w-4" />} type="danger" onClick={() => deleteItem(pass.id)} />
                  </td>
                </tr>
              ))}

              {activeTab === 'chatbot' && chatbotOptions.map(opt => (
                <tr key={opt.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">{opt.id}</td>
                  <td className="px-6 py-4 font-bold text-white">{opt.label}</td>
                  <td className="px-6 py-4 text-xs text-gray-400 italic max-w-md truncate">"{opt.response}"</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <ActionButton icon={<Edit3 className="h-4 w-4" />} onClick={() => openEditModal(opt)} />
                    <ActionButton icon={<Trash2 className="h-4 w-4" />} type="danger" onClick={() => deleteItem(opt.id)} />
                  </td>
                </tr>
              ))}

              {activeTab === 'reviews' && reviews.map(review => (
                <tr key={review.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">{review.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img src={review.userImage} className="h-10 w-10 rounded-full object-cover" />
                      <p className="font-bold text-white">{review.userName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex text-gold mb-1">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-3 w-3 fill-gold" />)}
                    </div>
                    <p className="text-xs text-gray-500 truncate max-w-xs">{review.comment}</p>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <ActionButton icon={<Edit3 className="h-4 w-4" />} onClick={() => openEditModal(review)} />
                    <ActionButton icon={<Trash2 className="h-4 w-4" />} type="danger" onClick={() => deleteItem(review.id)} />
                  </td>
                </tr>
              ))}

              {activeTab === 'services' && services.map(service => (
                <tr key={service.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">{service.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-white">{service.title}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-black">{service.icon}</p>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400 truncate max-w-xs">{service.description}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <ActionButton icon={<Edit3 className="h-4 w-4" />} onClick={() => openEditModal(service)} />
                    <ActionButton icon={<Trash2 className="h-4 w-4" />} type="danger" onClick={() => deleteItem(service.id)} />
                  </td>
                </tr>
              ))}

              {activeTab === 'events' && events.map(event => (
                <tr key={event.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">{event.id}</td>
                  <td className="px-6 py-4 font-bold text-white">{event.title}</td>
                  <td className="px-6 py-4 text-xs text-gray-400 truncate max-w-xs">{event.description}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <ActionButton icon={<Edit3 className="h-4 w-4" />} onClick={() => openEditModal(event)} />
                    <ActionButton icon={<Trash2 className="h-4 w-4" />} type="danger" onClick={() => deleteItem(event.id)} />
                  </td>
                </tr>
              ))}

              {activeTab === 'promos' && promos.map(promo => (
                <tr key={promo.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">{promo.id}</td>
                  <td className="px-6 py-4 font-bold text-white">{promo.title}</td>
                  <td className="px-6 py-4"><StatusBadge label={promo.type} type={promo.type === 'WISH' ? 'success' : 'default'} /></td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <ActionButton icon={<Edit3 className="h-4 w-4" />} onClick={() => openEditModal(promo)} />
                    <ActionButton icon={<Trash2 className="h-4 w-4" />} type="danger" onClick={() => deleteItem(promo.id)} />
                  </td>
                </tr>
              ))}

              {activeTab === 'faqs' && faqs.map(faq => (
                <tr key={faq.question} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">FAQ</td>
                  <td className="px-6 py-4 font-bold text-white max-w-xs truncate">{faq.question}</td>
                  <td className="px-6 py-4 text-xs text-gray-400 truncate max-w-xs">{faq.answer}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <ActionButton icon={<Edit3 className="h-4 w-4" />} onClick={() => openEditModal(faq)} />
                    <ActionButton icon={<Trash2 className="h-4 w-4" />} type="danger" onClick={() => deleteItem(faq.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Item Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-10 relative animate-in zoom-in duration-300">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white"><X className="h-6 w-6" /></button>
            <h3 className="text-2xl font-cinzel font-bold mb-8 capitalize">{editingItem.id || editingItem.question ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}</h3>
            
            <form onSubmit={saveItem} className="space-y-6">
              {activeTab === 'movies' && (
                <>
                  <Input label="Movie Title" value={editingItem.title} onChange={v => setEditingItem({...editingItem, title: v})} />
                  <Input label="Poster URL" value={editingItem.poster} onChange={v => setEditingItem({...editingItem, poster: v})} />
                  <Input label="Rating" value={editingItem.rating} onChange={v => setEditingItem({...editingItem, rating: v})} />
                  <Input label="Language" value={editingItem.language || ''} onChange={v => setEditingItem({...editingItem, language: v})} />
                  <Input label="Trailer URL" value={editingItem.trailerUrl || ''} onChange={v => setEditingItem({...editingItem, trailerUrl: v})} />
                  <Input label="Genres (comma separated)" value={editingItem.genre?.join(', ')} onChange={v => setEditingItem({...editingItem, genre: v.split(',').map(s => s.trim())})} />
                  <Input label="Cast (comma separated)" value={editingItem.cast?.join(', ')} onChange={v => setEditingItem({...editingItem, cast: v.split(',').map(s => s.trim())})} />
                  <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl">
                    <input type="checkbox" checked={editingItem.isNowShowing} onChange={e => setEditingItem({...editingItem, isNowShowing: e.target.checked})} className="h-5 w-5 rounded bg-black border-white/10 text-red-600 focus:ring-0" />
                    <label className="text-sm font-bold text-gray-300">Now Showing</label>
                  </div>
                  <textarea className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-red-600 outline-none transition-all" placeholder="Description" rows={3} value={editingItem.description} onChange={e => setEditingItem({...editingItem, description: e.target.value})} />
                </>
              )}

              {activeTab === 'reviews' && (
                <>
                  <Input label="User Name" value={editingItem.userName} onChange={v => setEditingItem({...editingItem, userName: v})} />
                  <Input label="User Image URL" value={editingItem.userImage} onChange={v => setEditingItem({...editingItem, userImage: v})} />
                  <Input label="Rating (1-5)" value={editingItem.rating.toString()} onChange={v => setEditingItem({...editingItem, rating: parseInt(v) || 5})} />
                  <textarea className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-red-600 outline-none transition-all" placeholder="Comment" rows={3} value={editingItem.comment} onChange={e => setEditingItem({...editingItem, comment: e.target.value})} />
                </>
              )}

              {activeTab === 'services' && (
                <>
                  <Input label="Service Title" value={editingItem.title} onChange={v => setEditingItem({...editingItem, title: v})} />
                  <Input label="Icon Name (Lucide)" value={editingItem.icon} onChange={v => setEditingItem({...editingItem, icon: v})} />
                  <textarea className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-red-600 outline-none transition-all" placeholder="Description" rows={3} value={editingItem.description} onChange={e => setEditingItem({...editingItem, description: e.target.value})} />
                  <Input label="Features (comma separated)" value={editingItem.features?.join(', ')} onChange={v => setEditingItem({...editingItem, features: v.split(',').map(s => s.trim())})} />
                </>
              )}

              {activeTab === 'passes' && (
                <>
                  <Input label="Pass Name" value={editingItem.name} onChange={v => setEditingItem({...editingItem, name: v})} />
                  <Input label="Price" value={editingItem.price} onChange={v => setEditingItem({...editingItem, price: v})} />
                  <Input label="Description" value={editingItem.description} onChange={v => setEditingItem({...editingItem, description: v})} />
                  <Input label="Features (comma separated)" value={editingItem.features?.join(', ')} onChange={v => setEditingItem({...editingItem, features: v.split(',').map(s => s.trim())})} />
                  <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl">
                    <input type="checkbox" checked={editingItem.popular} onChange={e => setEditingItem({...editingItem, popular: e.target.checked})} className="h-5 w-5 rounded bg-black border-white/10 text-red-600 focus:ring-0" />
                    <label className="text-sm font-bold text-gray-300">Popular Badge</label>
                  </div>
                </>
              )}

              {activeTab === 'chatbot' && (
                <>
                  <Input label="Quick Reply Label" value={editingItem.label} onChange={v => setEditingItem({...editingItem, label: v})} />
                  <textarea className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-red-600 outline-none transition-all" placeholder="Response" rows={4} value={editingItem.response} onChange={e => setEditingItem({...editingItem, response: e.target.value})} />
                </>
              )}

              {activeTab === 'faqs' && (
                <>
                  <Input label="Question" value={editingItem.question} onChange={v => setEditingItem({...editingItem, question: v})} />
                  <textarea className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-red-600 outline-none transition-all" placeholder="Answer" rows={4} value={editingItem.answer} onChange={e => setEditingItem({...editingItem, answer: e.target.value})} />
                </>
              )}

              {(activeTab === 'events' || activeTab === 'promos') && (
                <>
                  <Input label="Title" value={editingItem.title} onChange={v => setEditingItem({...editingItem, title: v})} />
                  <Input label="Image URL" value={editingItem.image || editingItem.imageUrl} onChange={v => setEditingItem({...editingItem, [activeTab === 'events' ? 'image' : 'imageUrl']: v})} />
                  <textarea className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-red-600 outline-none transition-all" placeholder="Description/Content" rows={3} value={editingItem.description || editingItem.content} onChange={e => setEditingItem({...editingItem, [activeTab === 'events' ? 'description' : 'content']: e.target.value})} />
                </>
              )}

              <div className="pt-4">
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center space-x-2 transition-all active:scale-95">
                  <Save className="h-5 w-5" /> <span>Save {activeTab.slice(0, -1)}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Input = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">{label}</label>
    <input type="text" value={value || ''} onChange={e => onChange(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-red-600 outline-none transition-all" />
  </div>
);

const SidebarItem = ({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${active ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}>
    {icon} <span>{label}</span>
  </button>
);

const ActionButton = ({ icon, type = 'default', onClick }: { icon: any, type?: 'default' | 'danger', onClick?: () => void }) => (
  <button onClick={onClick} className={`p-2 rounded-lg transition-all ${type === 'danger' ? 'hover:bg-red-600/20 text-red-500' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}>
    {icon}
  </button>
);

const StatusBadge = ({ label, type }: { label: string, type: 'success' | 'warning' | 'default' }) => (
  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
    type === 'success' ? 'bg-green-500/10 text-green-500' : type === 'warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-white/5 text-gray-400'
  }`}>
    {label}
  </span>
);

export default AdminPanel;

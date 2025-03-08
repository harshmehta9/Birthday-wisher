import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import { Cake, Heart, Stars, Sparkles } from 'lucide-react';

function Home() {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [from, setFrom] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && from.trim()) {
      navigate(`/${encodeURIComponent(name.trim())}/${encodeURIComponent(from.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl card-shadow p-8 w-full max-w-md animate-fade-in">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6 flex items-center justify-center gap-2">
          <Cake className="h-8 w-8 animate-float" />
          Birthday Wishes
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Enter the birthday person's name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Enter recipient's name..."
              required
            />
          </div>
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
              Your name (From)
            </label>
            <input
              type="text"
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Enter your name..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-all duration-300 flex items-center justify-center gap-2 hover:transform hover:scale-105"
          >
            <Stars className="h-5 w-5" />
            Create Birthday Card
          </button>
        </form>
      </div>
    </div>
  );
}

function BirthdayCard() {
  const { name, from } = useParams();
  const [isFlipped, setIsFlipped] = React.useState(false);

  // Redirect to home if name or from is missing
  if (!name || !from) {
    return <Navigate to="/" replace />;
  }

  const decodedName = decodeURIComponent(name);
  const decodedFrom = decodeURIComponent(from);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4">
      <div className="perspective-3d w-full max-w-md">
        <div
          className={`relative aspect-[3/4] cursor-pointer transition-transform duration-700 preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of the card */}
          <div className="absolute inset-0 backface-hidden">
            <div className="bg-white rounded-2xl card-shadow h-full flex flex-col items-center justify-center p-8 overflow-hidden">
              <div className="card-inner flex flex-col items-center justify-center w-full h-full relative">
                <div className="absolute top-4 left-4">
                  <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
                </div>
                <div className="absolute top-4 right-4">
                  <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
                </div>
                
                <Cake className="h-24 w-24 text-purple-600 mb-8 animate-float" />
                <h1 className="text-5xl font-bold text-center text-purple-600 mb-4 animate-fade-in">
                  Happy Birthday
                </h1>
                <p className="text-3xl text-center text-gray-700 capitalize mb-6 animate-fade-in">
                  {decodedName}!
                </p>
                <p className="text-sm text-center text-gray-500 mt-4 animate-fade-in">
                  Click the card to see your wishes
                </p>

                <div className="absolute bottom-4 left-4">
                  <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
                </div>
                <div className="absolute bottom-4 right-4">
                  <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Back of the card */}
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-2xl card-shadow h-full p-8">
              <div className="card-inner flex flex-col h-full relative">
                <div className="absolute top-4 right-4">
                  <Heart className="h-6 w-6 text-pink-300 animate-pulse" />
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                  <Heart className="h-20 w-20 text-pink-300 animate-heartbeat" />
                  
                  <div className="space-y-6 max-w-sm">
                    <p className="text-3xl font-semibold animate-fade-in">
                      Dear <span className="capitalize">{decodedName}</span>,
                    </p>
                    <p className="text-xl leading-relaxed animate-fade-in">
                      On your special day, I wish you endless joy, love, and laughter! May this year bring you amazing opportunities and beautiful moments.
                    </p>
                    <p className="text-xl leading-relaxed animate-fade-in">
                      Keep shining bright and spreading your wonderful energy everywhere you go! 🎉
                    </p>
                  </div>
                </div>

                <div className="w-full pt-6 mt-6 border-t border-purple-400/30">
                  <div className="text-center animate-fade-in">
                    <p className="text-lg text-purple-200">With love and best wishes,</p>
                    <p className="text-3xl font-bold mt-2 capitalize text-pink-300">{decodedFrom}</p>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4">
                  <Heart className="h-6 w-6 text-pink-300 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:name/:from" element={<BirthdayCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
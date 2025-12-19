import { Home, Mic } from 'lucide-react';

export function Header() {

  // -------------------------------
  // Mic button redirect handler
  // -------------------------------
  const handleMicClick = () => {
    // 🔁 Redirect to another website
    window.location.href = 'https://index-navy-ten.vercel.app/';
    
    // OR open in new tab:
    // window.open('https://your-other-website.com', '_blank');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left Section */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Home size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Smart Home</h1>
              <p className="text-xs text-gray-500">
                Automation & Energy Monitoring
              </p>
            </div>
          </div>

          {/* Mic Button */}
          <button
            onClick={handleMicClick}
            title="Voice Control"
            className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all"
          >
            <Mic size={20} />
          </button>

        </div>
      </div>
    </header>
  );
}




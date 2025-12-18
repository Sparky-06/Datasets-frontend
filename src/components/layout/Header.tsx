import { Home, Mic } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function Header() {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Browser support check
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event);
      setListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log('🎤 Voice Command:', transcript);

      // 🔜 Later: send transcript to backend
      // fetch('/api/voice-command', { method: 'POST', body: transcript });
    };

    recognitionRef.current = recognition;
  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current) return;

    if (listening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left */}
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
            className={`
              p-3 rounded-full transition-all
              ${listening
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-blue-600 text-white hover:bg-blue-700'}
            `}
          >
            <Mic size={20} />
          </button>

        </div>
      </div>
    </header>
  );
}


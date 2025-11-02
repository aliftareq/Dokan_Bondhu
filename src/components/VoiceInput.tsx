import { useState, useRef } from 'react';
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Mic, MicOff, Send } from 'lucide-react';
import { toast } from "sonner@2.0.3";
import { Input } from "./ui/input";

interface VoiceInputProps {
  onCommandProcessed: (command: string) => void;
}

export function VoiceInput({ onCommandProcessed }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [command, setCommand] = useState('');
  const [recentCommands, setRecentCommands] = useState<string[]>([]);
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast.error('Speech recognition is not supported in this browser. Please type your command instead.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'bn-BD'; // Bengali language
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      toast.info('Listening... Speak now', {
        description: 'শুনছি... এখন বলুন'
      });
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setCommand(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      toast.error('Error recognizing speech. Please try again or type your command.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleSubmit = () => {
    if (!command.trim()) {
      toast.error('Please enter or speak a command');
      return;
    }

    onCommandProcessed(command);
    setRecentCommands(prev => [command, ...prev.slice(0, 2)]);
    toast.success('Command processed successfully', {
      description: 'কমান্ড সফলভাবে প্রসেস করা হয়েছে'
    });
    setCommand('');
  };

  const useRecentCommand = (cmd: string) => {
    setCommand(cmd);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-50/95 via-white/95 to-violet-50/95 backdrop-blur-sm border-t-2 border-blue-200 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="space-y-2.5">
          {/* Main Input Row */}
          <div className="flex items-center gap-3">
            {/* Voice Command Label with Status */}
            <div className="flex items-center gap-2 min-w-fit">
              <span className="text-sm text-slate-700 hidden sm:inline">Voice Command</span>
              {isListening && (
                <div className="flex items-center gap-1.5 bg-blue-100 px-2 py-1 rounded-full border border-blue-300">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping"></div>
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full absolute"></div>
                  <span className="text-xs text-blue-700 ml-1.5">Recording</span>
                </div>
              )}
            </div>

            {/* Manual Type Box */}
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder='Type or speak: "Rahim 100 taka baki" or "Ata 1 kg bikri 55 taka"'
              className="flex-1 h-10"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />

            {/* Send Button */}
            <Button
              onClick={handleSubmit}
              disabled={!command.trim()}
              size="icon"
              className="shrink-0 h-10 w-10"
              title="Send Command"
            >
              <Send className="w-4 h-4" />
            </Button>

            {/* Enable Voice Command Button - Highlighted */}
            <Button
              onClick={isListening ? stopListening : startListening}
              variant={isListening ? "destructive" : "default"}
              className={`shrink-0 h-10 px-4 gap-2 ${!isListening ? 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700' : ''}`}
              title={isListening ? "Stop Recording" : "Start Voice Command"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span className="hidden md:inline text-sm">
                {isListening ? 'Stop' : 'Voice'}
              </span>
            </Button>
          </div>

          {/* Example & Recent Commands - Single Line Each */}
          <div className="flex flex-col gap-1.5 text-xs">
            {/* Example Commands */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-slate-600 shrink-0">Examples:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => useRecentCommand('Rahim 100 taka baki nilo')}
                  className="px-2 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-blue-300 transition-colors shrink-0 text-slate-700"
                >
                  Rahim 100 taka baki
                </button>
                <button
                  onClick={() => useRecentCommand('Ata 1 kg bikri holo 55 takay')}
                  className="px-2 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-blue-300 transition-colors shrink-0 text-slate-700"
                >
                  Ata 1 kg bikri 55 taka
                </button>
                <button
                  onClick={() => useRecentCommand('Dal 5 kg stock ashlo')}
                  className="px-2 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-blue-300 transition-colors shrink-0 text-slate-700"
                >
                  Dal 5 kg stock
                </button>
                <button
                  onClick={() => useRecentCommand('Karim 200 taka dilo')}
                  className="px-2 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-blue-300 transition-colors shrink-0 text-slate-700"
                >
                  Karim 200 taka dilo
                </button>
              </div>
            </div>

            {/* Recent Commands - Only show if there are any */}
            {recentCommands.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-slate-600 shrink-0">Recent:</span>
                <div className="flex gap-1.5">
                  {recentCommands.map((cmd, idx) => (
                    <button
                      key={idx}
                      onClick={() => useRecentCommand(cmd)}
                      className="px-2 py-1 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 hover:border-blue-400 transition-colors shrink-0 text-slate-700"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

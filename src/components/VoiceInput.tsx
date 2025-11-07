import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Mic, MicOff } from "lucide-react";
import { toast } from "sonner";

interface VoiceInputProps {
  onCommandProcessed: (command: string) => void;
}

export function VoiceInput({ onCommandProcessed }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [command, setCommand] = useState("");
  const [recentCommands, setRecentCommands] = useState<string[]>([]);
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error(
        "Speech recognition is not supported in this browser. Please type your command instead."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "bn-BD";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      toast.info("Listening... Speak now", {
        description: "শুনছি... এখন বলুন",
      });
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setCommand(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast.error(
        "Error recognizing speech. Please try again or type your command."
      );
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsListening(false);
  };

  const handleSubmit = () => {
    if (!command.trim()) {
      toast.error("Please enter or speak a command");
      return;
    }

    onCommandProcessed(command);
    setRecentCommands((prev) =>
      [command, ...prev.filter((c) => c !== command)].slice(0, 4)
    );
    toast.success("Command processed successfully", {
      description: "কমান্ড সফলভাবে প্রসেস করা হয়েছে",
    });
    setCommand("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div
        className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6 py-10 rounded-3xl
        bg-gradient-to-b from-[#0b1220] via-[#101a33] to-[#0a1324] border border-white/10 
        shadow-[0_0_40px_rgba(124,58,237,.15)]"
      >
        {/* Mic button */}
        <div className="relative">
          <div
            className={`pointer-events-none absolute inset-0 rounded-full blur-2xl transition-all duration-500 ${
              isListening ? "opacity-90" : "opacity-40"
            }`}
            style={{
              background: isListening
                ? "conic-gradient(from 0deg,#ef4444,#f87171,#fca5a5,#ef4444)"
                : "conic-gradient(from 0deg,#60a5fa,#a78bfa,#22d3ee,#60a5fa)",
            }}
          />
          <Button
            onClick={isListening ? stopListening : startListening}
            variant={isListening ? "destructive" : "default"}
            title={isListening ? "Stop Recording" : "Start Voice Command"}
            className={`relative h-44 w-44 rounded-full px-4 transition-all duration-500
              ${
                isListening
                  ? "bg-gradient-to-tr from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400"
                  : "bg-gradient-to-tr from-violet-600 to-cyan-400 hover:from-violet-500 hover:to-cyan-300"
              }
              text-slate-900 font-extrabold shadow-[0_8px_24px_rgba(109,40,217,.35)]`}
          >
            <div className="flex flex-col items-center justify-center">
              {isListening ? (
                <MicOff
                  size={72}
                  className="text-white drop-shadow-[0_0_8px_rgba(239,68,68,.8)]"
                />
              ) : (
                <Mic
                  size={72}
                  className="text-white drop-shadow-[0_0_6px_rgba(96,165,250,.6)]"
                />
              )}
              <span
                className={`mt-1 text-xl ${
                  isListening ? "text-white" : "text-slate-900"
                }`}
              >
                {isListening ? "Stop" : "Voice"}
              </span>
            </div>
          </Button>
        </div>

        {/* Recording badge */}
        {isListening && (
          <div className="flex items-center gap-2 rounded-full border border-red-400 bg-red-100/90 px-3 py-1 shadow-[0_0_12px_rgba(239,68,68,.4)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600"></span>
            </span>
            <span className="text-xs font-semibold text-red-700">
              Recording…
            </span>
          </div>
        )}

        {/* Textarea */}
        <div className="w-full px-4">
          <textarea
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder='Type or speak: "রহিম দুই কেজি আটা ৭০ টাকায় বাকি নিলো"'
            rows={4}
            className="w-full resize-none h-32 rounded-xl border border-white/20 bg-white/10 text-slate-100
              placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-violet-400/60
              focus-visible:border-transparent p-3 leading-relaxed"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
        </div>

        {/* Recent Commands */}
        {recentCommands.length > 0 && (
          <div className="w-full px-4">
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-200">
                  শেষের কমান্ডগুলো
                </h4>
                <button
                  className="text-xs text-slate-400 hover:text-slate-200"
                  onClick={() => setRecentCommands([])}
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentCommands.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setCommand(c)}
                    title="ট্যাপ করলে ইনপুটে বসবে"
                    className="group rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-left text-xs text-slate-200
                      hover:bg-white/15 hover:border-white/20 transition-colors"
                  >
                    <span className="line-clamp-1">{c}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submit button */}
        <Button
          onClick={handleSubmit}
          disabled={!command.trim()}
          title="Send Command"
          className="w-1/3 min-w-40 h-12 rounded-xl 
             bg-gradient-to-tr from-violet-500 to-cyan-300 
             font-extrabold text-slate-900 
             shadow-[0_8px_24px_rgba(109,40,217,.35)] 
             hover:-translate-y-0.5 transition-all"
        >
          হিসাব তুলুন
        </Button>
      </div>
    </div>
  );
}

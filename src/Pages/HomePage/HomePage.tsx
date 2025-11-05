import { VoiceInput } from "../../components/VoiceInput";
import { Toaster } from "sonner";

const Home = () => {
  const processVoiceCommand = (command: string) => {
    console.log("Processed:", command);
  };

  return (
    <section 
    className="relative flex flex-col items-center justify-start 
    min-h-screen w-full bg-white text-center pt-28 pb-10 overflow-hidden"
    >
      {/* Main Content */}
      <h1 className="text-5xl font-extrabold text-black mb-6">
        রহিমের দোকান
      </h1>

      <p className="text-xl font-semibold text-black mb-8">
        আজকের মোট বিক্রিঃ <span className="underline">____</span> টাকা
      </p>

      {/* হিসাব তুলুন Button */}
      <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all">
        হিসাব তুলুন
      </button>

      {/* Voice Command Section */}
      <div className="mt-10 w-full flex justify-center">
        <div className="max-w-3xl w-full">
          <VoiceInput onCommandProcessed={processVoiceCommand} />
        </div>
      </div>

      {/* Transactions Title */}
      <h2 className="text-2xl font-bold text-green-700 mt-16 mb-4">
        আজকের বিক্রি (Transactions)
      </h2>

      {/* Placeholder Transaction List */}
      <div className="w-[90%] md:w-[70%] border border-black rounded-lg p-4 text-left shadow-sm">
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>লেনদেন ১</li>
          <li>লেনদেন ২</li>
          <li>লেনদেন ৩</li>
          <li>লেনদেন ৪</li>
        </ul>
      </div>

      {/* Toaster */}
      <Toaster />
    </section>
  );
};

export default Home;

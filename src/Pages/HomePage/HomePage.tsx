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
      <h1 className="text-5xl font-extrabold text-black mb-6">রহিমের দোকান</h1>

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
        আজকের বিক্রি (Recent Transactions)
      </h2>

      {/* Placeholder Transaction List */}
      <div className="w-[90%] md:w-[70%] border border-black rounded-lg p-4 text-left shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-left text-gray-600">
                  #
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-600">
                  কাস্টমার
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-600">
                  পণ্যের বিবরণ
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-600">
                  মোট খরচ
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-600">
                  স্ট্যাটাস
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">রহিম</td>
                <td className="px-4 py-2">চাল,ডাল,তেল</td>
                <td className="px-4 py-2">৳500</td>
                <td className="px-4 py-2 text-green-600 font-medium">নগদ</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">ফাহিম</td>
                <td className="px-4 py-2">ডাল,রসুন</td>
                <td className="px-4 py-2">৳300</td>
                <td className="px-4 py-2 text-yellow-600 font-medium">বাকি</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2">3</td>
                <td className="px-4 py-2">রিয়াদ</td>
                <td className="px-4 py-2">তেল, ডাল</td>
                <td className="px-4 py-2">৳700</td>
                <td className="px-4 py-2 text-yellow-600 font-medium">বাকি</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2">4</td>
                <td className="px-4 py-2">রহিম</td>
                <td className="px-4 py-2">রসুন</td>
                <td className="px-4 py-2">৳400</td>
                <td className="px-4 py-2 text-green-600 font-medium">নগদ</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2">5</td>
                <td className="px-4 py-2">ফাহিম</td>
                <td className="px-4 py-2">পেঁয়াজ</td>
                <td className="px-4 py-2">৳350</td>
                <td className="px-4 py-2 text-yellow-600 font-medium">বাকি</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Toaster */}
      <Toaster />
    </section>
  );
};

export default Home;

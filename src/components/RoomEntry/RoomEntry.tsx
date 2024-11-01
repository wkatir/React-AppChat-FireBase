import React from "react";
import { Sparkles, ChevronRight } from "lucide-react";

interface RoomEntryProps {
  roomInput: string;
  setRoomInput: (value: string) => void;
  handleEnterRoom: () => void;
}

export const RoomEntry: React.FC<RoomEntryProps> = ({
  roomInput,
  setRoomInput,
  handleEnterRoom,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-8">
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

        {/* Main Content */}
        <div className="relative p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          {/* Title Section */}
          <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
            <Sparkles className="w-4 sm:w-6 h-4 sm:h-6 text-blue-400 animate-pulse" />
            <h2 className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center">
              Room
            </h2>
            <Sparkles className="w-4 sm:w-6 h-4 sm:h-6 text-purple-400 animate-pulse" />
          </div>

          {/* Input Section */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
            <div className="relative flex items-center">
              <input
                value={roomInput}
                onChange={(e) => setRoomInput(e.target.value)}
                className="w-full pl-4 sm:pl-12 pr-4 py-2 sm:py-4 bg-gray-800/50 border border-gray-700 rounded-lg 
              text-xs sm:text-base text-gray-100 placeholder-gray-400 
              focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
              transition-all duration-300"
                placeholder="Enter the name of the room..."
              />
            </div>
          </div>

          {/* Enter Button */}
          <button
            onClick={handleEnterRoom}
            className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-px focus:outline-none"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-gradient-to-r from-blue-600 to-purple-600" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-gray-900 px-4 sm:px-6 py-2 sm:py-4 text-sm font-medium backdrop-blur-3xl transition-all duration-300 group-hover:bg-opacity-80">
              <span className="relative text-gray-100 flex items-center gap-1 sm:gap-2 font-semibold tracking-wider text-xs sm:text-sm">
                ENTER
                <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
        <div className="absolute top-16 sm:top-20 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-blue-500/10 rounded-full filter blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-16 sm:bottom-20 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-purple-500/10 rounded-full filter blur-2xl sm:blur-3xl"></div>
      </div>
    </div>
  );
};

export default RoomEntry;

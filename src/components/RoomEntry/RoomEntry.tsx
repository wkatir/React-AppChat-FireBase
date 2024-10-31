import React from "react";
import { Sparkles, KeyRound, ChevronRight } from "lucide-react";

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
    <div className="min-h-[400px] w-full max-w-4xl mx-auto p-8">
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

        <div className="relative p-8 space-y-6">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Sparkles className="w-6 h-6 text-blue-400 animate-pulse" />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Room Entry Portal
            </h2>
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
            <div className="relative flex items-center">
              <KeyRound className="absolute left-4 w-5 h-5 text-gray-400" />
              <input
                value={roomInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRoomInput(e.target.value)
                }
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="Enter the name of the room..."
              />
            </div>
          </div>

          <button
            onClick={handleEnterRoom}
            className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-px focus:outline-none"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-gradient-to-r from-blue-600 to-purple-600" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-gray-900 px-6 py-4 text-sm font-medium backdrop-blur-3xl transition-all duration-300 group-hover:bg-opacity-80">
              <span className="relative text-gray-100 flex items-center gap-2 font-semibold tracking-wider">
                ENTER THE PORTAL
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </span>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
        <div className="absolute top-20 left-0 w-32 h-32 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-0 w-32 h-32 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      </div>
    </div>
  );
};

export default RoomEntry;

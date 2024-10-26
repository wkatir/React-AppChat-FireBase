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
      <div className="space-y-4 sm:space-y-6">
        <label className="block text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-300 text-center mb-4 sm:mb-6">
          Enter Room Name
        </label>
        <input
          value={roomInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRoomInput(e.target.value)
          }
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white/20 transition duration-300 text-sm sm:text-base"
          placeholder="Room name"
        />
        <button
          onClick={handleEnterRoom}
          className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-1 transition duration-300 ease-in-out text-sm sm:text-base"
        >
          Enter Chat
        </button>
      </div>
    );
  };
  
import { useState, useRef } from "react";
import Auth from "./components/Auth/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./utils/fireBaseConfig";

const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(
    cookies.get("auth-token") ? true : false
  );
  const [room, setRoom] = useState<string | null>(null);
  const roomInputRef = useRef<HTMLInputElement | null>(null);

  const signUserOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      setIsAuth(false);
      setRoom(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth}></Auth>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
        <div className="w-full max-w-md p-4 sm:p-6 md:p-8 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 transform hover:scale-105 transition duration-300">
          {room ? (
            <Chat room={room}></Chat>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <label className="block text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-300 text-center mb-4 sm:mb-6">
                Enter Room Name
              </label>
              <input
                ref={roomInputRef}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white/20 transition duration-300 text-sm sm:text-base"
                placeholder="Room name"
              />
              <button
                onClick={() => setRoom(roomInputRef.current!.value)}
                className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-1 transition duration-300 ease-in-out text-sm sm:text-base"
              >
                Enter Chat
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
        <button
          onClick={signUserOut}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full font-semibold hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-400 transform hover:-translate-y-1 hover:shadow-lg transition duration-300 ease-in-out text-sm sm:text-base"
        >
          Sign out
        </button>
      </div>
    </>
  );
};

export default App;

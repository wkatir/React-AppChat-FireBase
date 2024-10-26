import { ReactNode } from "react";

interface ChatContainerProps {
    children: ReactNode;
  }
  
  export const ChatContainer: React.FC<ChatContainerProps> = ({ children }) => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
        <div className="w-full max-w-md p-4 sm:p-6 md:p-8 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 transform hover:scale-105 transition duration-300">
          {children}
        </div>
      </div>
    );
  };
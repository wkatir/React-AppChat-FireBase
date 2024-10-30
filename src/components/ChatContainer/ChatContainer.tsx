import { ReactNode } from "react";

interface ChatContainerProps {
  children: ReactNode;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4">
      <div className="relative w-full max-w-4xl">
        <div className="absolute top-20 left-0 w-32 h-32 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-0 w-32 h-32 bg-purple-500/10 rounded-full filter blur-3xl"></div>

        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative p-6 backdrop-blur-3xl">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;

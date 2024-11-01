import React from "react";
import { auth } from "../../utils/fireBaseConfig";
import { Trash2, Edit2, X, Check, Send } from "lucide-react";
import { ChatProps } from "../../interfaces/chat/chatprops";
import { useChat } from "../../hooks/useChat";
import { generateUserColor } from "../../utils/userColorUtil";

const Chat: React.FC<ChatProps> = (props) => {
  const { room } = props;
  const {
    newMessage,
    setNewMessage,
    messages,
    editingId,
    editingText,
    setEditingText,
    handleSubmit,
    handleDelete,
    startEditing,
    cancelEditing,
    handleEdit,
  } = useChat(room);

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-4">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-6 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl shadow-xl">
        {/* Room Header */}
        <div className="border-b border-white/20 pb-2 sm:pb-4">
          <h1 className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-300 text-center">
            {room.toUpperCase()}
          </h1>
        </div>

        {/* Messages Container */}
        <div className="h-[50vh] min-h-[300px] max-h-[600px] overflow-y-auto space-y-2 sm:space-y-4 pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-300">
          {messages.map((message) => (
            <div
              key={message.id}
              className="bg-white/10 p-2 sm:p-4 rounded-xl backdrop-blur-sm hover:bg-white/15 transition duration-300 relative group"
            >
              {/* Username */}
              <span
                className={`font-semibold ${generateUserColor(
                  message.user
                )} text-xs sm:text-base`}
              >
                {message.user}
              </span>

              {/* Editing State */}
              {editingId === message.id ? (
                <div className="mt-2 flex items-center space-x-2">
                  <input
                    className="flex-grow px-2 sm:px-3 py-1 text-xs sm:text-base bg-white/20 rounded text-white focus:outline-none focus:ring-1 focus:ring-pink-400"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button
                    onClick={() => handleEdit(message.id)}
                    className="p-1 text-green-400 hover:text-green-300"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="p-1 text-red-400 hover:text-red-300"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <p className="mt-1 text-white/90 text-xs sm:text-base">
                  {message.text}
                </p>
              )}

              {/* Edit/Delete Buttons */}
              {message.user === auth.currentUser?.displayName && !editingId && (
                <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex space-x-1 sm:space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => startEditing(message)}
                    className="p-1 text-blue-400 hover:text-blue-300"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="p-1 text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            className="flex-grow px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 rounded-full text-white 
          placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 
          focus:bg-white/20 transition duration-300 text-xs sm:text-base"
            placeholder="Type your message here"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button
            type="submit"
            className="px-3 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-pink-500 to-purple-600 
          text-white rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 
          focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 
          ease-in-out transform hover:-translate-y-1 text-xs sm:text-base flex items-center justify-center"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

import React, { useState } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { Message } from "../types";
import { MessageList } from "./MessageList";

interface ChatRoomProps {
  roomId: string;
  username: string;
  onLeaveRoom: () => void;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export function ChatRoom({
  roomId,
  username,
  onLeaveRoom,
  messages,
  onSendMessage,
}: ChatRoomProps) {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage(""); // Clear input field
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={onLeaveRoom}
                className="mr-4 p-2 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Room: {roomId}
                </h2>
                <p className="text-sm text-gray-500">Connected as {username}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <MessageList messages={messages} currentUser={username} />
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <form onSubmit={handleSendMessage} className="flex gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:indigo-gray-500"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className={`inline-flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                message.trim()
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-indigo-300 text-indigo-500 cursor-not-allowed"
              }`}
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

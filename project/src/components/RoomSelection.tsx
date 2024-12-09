import React, { useState } from 'react';
import { Users, Plus, LogIn } from 'lucide-react';

interface RoomSelectionProps {
  onJoinRoom: (roomId: string, username: string) => void;
  onCreateRoom: (roomName: string, username: string) => void;
  setRoomState: React.Dispatch<React.SetStateAction<{
    inRoom: boolean;
    roomId: string;
    username: string;
  }>>;}

export function RoomSelection({ onJoinRoom, onCreateRoom ,setRoomState }: RoomSelectionProps) {
  const [isJoining, setIsJoining] = useState(true);
  const [username, setUsername] = useState('');
  const [roomInput, setRoomInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isJoining) {
      onJoinRoom(roomInput, username);
      setRoomState({
        inRoom: true,
        roomId:roomInput,
        username,
      });
    } else {
      onCreateRoom(username, username);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
      <div className="flex justify-center mb-8">
        <Users className="w-16 h-16 text-gray-600" />
      </div>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setIsJoining(true)}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            isJoining
              ? 'bg-indigo-600 text-white'
              : 'bg-indigo-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Join Room
        </button>
        <button
          onClick={() => setIsJoining(false)}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            !isJoining
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Create Room
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isJoining ? 'Room ID' : 'Room Name'}
          </label>
          <input
            type="text"
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={isJoining ? 'Enter room ID' : 'Enter room name'}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {isJoining ? (
            <>
              <LogIn className="w-5 h-5" /> Join Room
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" /> Create Room
            </>
          )}
        </button>
      </form>
    </div>
  );
}
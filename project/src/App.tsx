import React, { useEffect, useState } from "react";
import { RoomSelection } from "./components/RoomSelection";
import { ChatRoom } from "./components/ChatRoom";
import { Message } from "./types";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [roomState, setRoomState] = useState<{
    inRoom: boolean;
    roomId: string;
    username: string;
  }>({
    inRoom: false,
    roomId: "",
    username: "",
  });
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket connected!");
    };

    ws.onmessage = (event) => {
      console.log("Received message:", event.data);

      try {
        const parsedMessage = JSON.parse(event.data);

        if (parsedMessage.type === "chat") {
          const newMessage: Message = {
            id: Date.now().toString(),
            sender: parsedMessage.payload.username,
            content: parsedMessage.payload.message,
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }

        if (parsedMessage.type === "Room Created!") {
          const { roomId, username } = parsedMessage.payload;
          setRoomState({
            inRoom: true,
            roomId,
            username,
          });
        }

        if (parsedMessage === "Join Successfully!") {
          setRoomState((prevState) => ({
            ...prevState,
            inRoom: true,
          }));
        }
      } catch (error) {
        console.log("Error parsing message:", error);
      }
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  // Function to send WebSocket requests
  const sendRequest = (data: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
    } else {
      console.log("WebSocket is not open");
    }
  };

  const handleJoinRoom = (roomId: string, username: string) => {
    const data = {
      type: "join",
      payload: {
        username,
        roomId,
      },
    };
    sendRequest(data);
  };

  const handleCreateRoom = (username: string) => {
    const data = {
      type: "create",
      payload: {
        username,
      },
    };
    sendRequest(data);
  };

  const handleSendMessage = (content: string) => {
    const data = {
      type: "chat",
      payload: {
        username: roomState.username,
        message: content,
      },
    };
    sendRequest(data);
  };

  const handleLeaveRoom = () => {
    setRoomState({
      inRoom: false,
      roomId: "",
      username: "",
    });
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!roomState.inRoom ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <RoomSelection
            onJoinRoom={handleJoinRoom}
            onCreateRoom={handleCreateRoom}
          />
        </div>
      ) : (
        <ChatRoom
          roomId={roomState.roomId}
          username={roomState.username}
          messages={messages}
          onSendMessage={handleSendMessage}
          onLeaveRoom={handleLeaveRoom}
        />
      )}
    </div>
  );
}

export default App;

import { WebSocket, WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";

const wss = new WebSocketServer({ port: 8080 });

interface User {
 socket:WebSocket,
 room: String
}

let userCount = 0;
let allSocket : User[]=[];


wss.on("connection", (socket) => {
  console.log("User Connected!");
  userCount = userCount + 1;

  socket.on("message", (message) => {
    //@ts-ignore
    const  parsedMessage = JSON.parse(message.toString());

    if( parsedMessage.type == 'join'){
      allSocket.push({
         socket,
         room:parsedMessage.payload.roomId
      })
      socket.send("Join Successfully!")
   };

      if(parsedMessage.type=='chat'){
         const CurrentUserRoom  = allSocket.find((x)=> x.socket == socket)?.room;
         allSocket.map((x)=>{
         if(x.room == CurrentUserRoom){
            x.socket.send(parsedMessage.payload.message);
         }
         })
         socket.send("Message Sent Successfully!")
      };

      if(parsedMessage.type == 'create'){
           const roomId = uuidv4();
           allSocket.push({
            socket,
            room:roomId
         })
           socket.send(roomId);
           socket.send("You Create & Join Room Successfully!")
      }

});

socket.on('close',()=>{
 allSocket =allSocket.filter(x => x.socket != socket)
})

})
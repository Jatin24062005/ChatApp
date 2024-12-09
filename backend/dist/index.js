"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const uuid_1 = require("uuid");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let allSocket = [];
wss.on("connection", (socket) => {
    console.log("User Connected!");
    userCount = userCount + 1;
    socket.on("message", (message) => {
        var _a;
        //@ts-ignore
        const parsedMessage = JSON.parse(message.toString());
        const username = parsedMessage.payload.username;
        if (parsedMessage.type == 'join') {
            allSocket.push({
                socket,
                username,
                room: parsedMessage.payload.roomId
            });
            socket.send("Join Successfully!");
        }
        ;
        if (parsedMessage.type == 'chat') {
            const CurrentUserRoom = (_a = allSocket.find((x) => x.socket == socket)) === null || _a === void 0 ? void 0 : _a.room;
            const data = {
                type: "chat",
                payload: {
                    message: parsedMessage.payload.message,
                    username: username
                }
            };
            allSocket.map((x) => {
                if (x.room == CurrentUserRoom) {
                    x.socket.send(JSON.stringify(data));
                }
            });
            socket.send("Message Sent Successfully!");
        }
        ;
        if (parsedMessage.type == 'create') {
            const roomId = (0, uuid_1.v4)();
            allSocket.push({
                socket,
                username,
                room: roomId
            });
            const data = {
                type: "Room Created!",
                payload: {
                    roomId: roomId,
                    username: username
                }
            };
            socket.send(JSON.stringify(data));
            socket.send("You Create & Join Room Successfully!");
        }
    });
    socket.on('close', () => {
        allSocket = allSocket.filter(x => x.socket != socket);
    });
});

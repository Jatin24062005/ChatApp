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
        if (parsedMessage.type == 'join') {
            allSocket.push({
                socket,
                room: parsedMessage.payload.roomId
            });
            socket.send("Join Successfully!");
        }
        ;
        if (parsedMessage.type == 'chat') {
            const CurrentUserRoom = (_a = allSocket.find((x) => x.socket == socket)) === null || _a === void 0 ? void 0 : _a.room;
            allSocket.map((x) => {
                if (x.room == CurrentUserRoom) {
                    x.socket.send(parsedMessage.payload.message);
                }
            });
            socket.send("Message Sent Successfully!");
        }
        ;
        if (parsedMessage.type == 'create') {
            const roomId = (0, uuid_1.v4)();
            allSocket.push({
                socket,
                room: roomId
            });
            socket.send(roomId);
        }
    });
    socket.on('close', () => {
        allSocket = allSocket.filter(x => x.socket != socket);
    });
});

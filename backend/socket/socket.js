import {Server} from 'socket.io';
import http from "http";
import app from '../app.js';

const server = http.createServer(app)
const io= new Server(server,{
    cors:{
        origin:["http://localhost:5173","https://twitter-web-app-eight.vercel.app"],
        methods:['GET','POST']
    }
});


export const getReceiverSocketId = (receiverId) => {
    return storeUser[receiverId];
}

const storeUser = {};


io.on('connection', (socket)=>{
    console.log('user connected ',socket.id)
    const userId = socket.handshake.query.userId
    if(userId !== undefined){
        storeUser[userId] = socket.id;
    } 

    io.emit('getOnlineUsers',Object.keys(storeUser));

    socket.on('disconnect', ()=>{
        console.log('user disconneted',userId)
        delete storeUser[userId];
        io.emit('getOnlineUsers',Object.keys(storeUser));
    })

})


export {io, server}
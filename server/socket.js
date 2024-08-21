import { Server as SocketIoServer } from 'socket.io'; 
import { Message } from './models/message.model.js';

export const setUpSocket = (server) => {
    const io = new SocketIoServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    };

    const sendMessage = async (message) => {
         const senderSocketId = userSocketMap.get(message.sender);
         const receiverSocketId = userSocketMap.get(message.receiver);

         const createdMessage = await Message.create(message);

         const messageData = await Message.findById(createdMessage._id).populate('sender', "id username image color")
         .populate('receiver', "id username image color")
        ;

        if(receiverSocketId) {
            io.to(receiverSocketId).emit('receiveMessage', messageData);
        }

        if(senderSocketId) {
            io.to(senderSocketId).emit('sendMessage', messageData);
        }
    }

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
        } else {
            console.log('User ID not provided');
        }

        socket.on('sendMessage', sendMessage);

        socket.on('disconnect', () => {
            disconnect(socket);
        });
    });
}

export default setUpSocket;

import { Server as SocketIoServer } from 'socket.io';    

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
        console.log(`User disconnected with id: ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    };

    const sendMessage =async (message) => {
         
    }

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected with id: ${userId} with socket id: ${socket.id}`);
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

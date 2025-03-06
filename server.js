import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import cloudinary from 'cloudinary'
import helmet from 'helmet'
import mongSantize from 'express-mongo-sanitize';
import http from 'http'
import { Server } from 'socket.io';

// all routers
import jobRouter from './routes/jobRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import allJobsRouter from './routes/allJobRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

// authentication middleware
import { authenticatedUserRequests } from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';
import { httpUpdateUserDetails } from './controllers/userControllers.js';
import { validateUpdateUserDetails } from './middleware/validationMiddleware.js';
import issueRoutes from './routes/issueRoutes.js';
import applicationRoutes from './routes/applicationsRoutes.js';
import hireRequestsRoutes from './routes/hireRequestsRoutes.js';
import { getOnlineUsers, setSocketServerInstance } from './message-feature/socketConnections/serverstore.js';
import { verifyTokenSocket } from './middleware/authSocket.js';
import { newConnectionHandler } from './message-feature/socketConnections/newConnectionHandler.js';
import { disconnectUserHandler } from './message-feature/socketConnections/disconnectHandler.js';
import contactsRoutes from './routes/contactsRoutes.js';

dotenv.config();

const app = express();
console.log('port', process.env.PORT)
const port = process.env.PORT || 8000;


cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.cloud_Key,
    api_secret: process.env.Cloud_API_Secret
});


const __dirname = dirname(fileURLToPath(import.meta.url))  // since using es6 so we have to follow this rule

app.use(express.static(path.resolve(__dirname, './public')))  // it will serve the whole 'public' directory

// cookie parser for the cookies
app.use(cookieParser())

app.use(express.json());

// Security middleware
// app.use(helmet())
// app.use(mongSantize())

// Logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Event emitter for successful connection to the database
mongoose.connection.once('open', () => {
    console.log('Mongoose connection is ready');
});

// Event emitter for unsuccessful database connection
mongoose.connection.on('error', (error) => {
    console.error('Mongoose connection error:', error);
});

app.use(cors({
    origin: 'http://localhost:5173',  // Vite's default dev server URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"],
    credentials: true,  // Allow credentials (cookies)
}));


// all auth routes under /auth
app.use('/auth', authRouter);

app.use('/user', authenticatedUserRequests, userRoutes)

// all job routes under /job
app.use('/jobs', authenticatedUserRequests, jobRouter);

app.use(allJobsRouter)

app.use('/services', authenticatedUserRequests, servicesRoutes)

app.use('/subscriptions', authenticatedUserRequests, subscriptionRoutes)

app.use('/leaderboard', authenticatedUserRequests, leaderboardRoutes)

app.use('/issue', authenticatedUserRequests, issueRoutes)

app.use('/application', authenticatedUserRequests, applicationRoutes)

app.use('/hireFreelancers', authenticatedUserRequests, hireRequestsRoutes)

app.use('/services-contacts', authenticatedUserRequests, contactsRoutes)

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Vite's default dev server URL
        methods: ['GET', 'POST'],
        credentials: true, // Allow cookies
    },
    connectTimeout: 10000, // Increase timeout for debugging
    pingTimeout: 10000,
    pingInterval: 3000,
});
setSocketServerInstance(io)


// middleware for verify valid users using token authentication
io.use((socket, next) => {
    verifyTokenSocket(socket, next)
})

console.log("📡 Socket.IO server initialized");


// Add this immediately after setting up io

io.engine.on("connection_error", (err) => {
    console.log("🚫 Socket.IO engine connection error:", err);
});

io.engine.on("initial_headers", (headers, req) => {
    console.log("🔄 Socket.IO initial headers sent");
});

const emitOnlineUsers = () => {
    const onlineUsers = getOnlineUsers()
    io.emit('online-users', { onlineUsers })  // emitting the online-users with a object consists of all online Users
}

io.use((socket, next) => {
    console.log("Socket connection attempt received");
    next(); // Always allow connections for now
});


// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    newConnectionHandler(socket, io)
    emitOnlineUsers()

    // Listen for typing event
    socket.on("typing", ({ chatId, username }) => {
        socket.to(chatId).emit("userTyping", { fullName });
    });

    // Listen for stop typing event
    socket.on("stopTyping", ({ chatId }) => {
        socket.to(chatId).emit("userStoppedTyping");
    });

    // for direct message ie conversation between two users
    socket.on('direct-message', async (data) => {
        // directMessage(socket,data)
        try {
            console.log('direct message received:', data);
            await directMessage(socket, data);
        } catch (error) {
            console.error('Direct message error:', error);
            socket.emit('error', { message: 'Failed to send message' });
        }
    })

    // for direct chat history
    socket.on('direct-chat-history', async (data) => {
        // directChatHistoryHandler(socket,data)
        try {
            await directChatHistoryHandler(socket, data);
        } catch (error) {
            console.error('Direct chat history error:', error);
            socket.emit('error', { message: 'Failed to fetch chat history' });
        }
    })

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        disconnectUserHandler(socket)
        emitOnlineUsers()
    });
});



// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Connecting to the database and starting the server
async function startServer() {
    try {
        await mongoose.connect(process.env.Mongo_Url);
        server.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
}

startServer();

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Something went wrong' });
});

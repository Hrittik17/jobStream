import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import cloudinary from 'cloudinary'
import helmet from 'helmet'
import mongSantize from 'express-mongo-sanitize';

// all routers
import jobRouter from './routes/jobRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import allJobsRouter from './routes/allJobRoutes.js';

import {dirname} from 'path'
import {fileURLToPath} from 'url'
import path from 'path'

// authentication middleware
import { authenticatedUserRequests } from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';
import { httpUpdateUserDetails } from './controllers/userControllers.js';
import { validateUpdateUserDetails } from './middleware/validationMiddleware.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;


cloudinary.config({ 
    cloud_name:process.env.Cloud_Name, 
    api_key:process.env.cloud_Key, 
    api_secret:process.env.Cloud_API_Secret
});


const __dirname = dirname(fileURLToPath(import.meta.url))  // since using es6 so we have to follow this rule

app.use(express.static(path.resolve(__dirname,'./public')))  // it will serve the whole 'public' directory

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
    methods: ['GET', 'POST', 'PUT', 'DELETE',"PATCH"],
    credentials: true,  // Allow credentials (cookies)
}));


// all auth routes under /auth
app.use('/auth', authRouter);

app.use('/user',authenticatedUserRequests, userRoutes)

// all job routes under /job
app.use('/jobs',authenticatedUserRequests,jobRouter);

app.use(allJobsRouter)

// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Connecting to the database and starting the server
async function startServer() {
    try {
        await mongoose.connect(process.env.Mongo_Url);
        app.listen(port, () => {
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

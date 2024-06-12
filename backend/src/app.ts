import express, { Application, Request, Response, NextFunction } from 'express';
import connectDB from './framework/database/mongodb/connection'; // Adjust the path according to your project structure
import configKeys from './config'; // Adjust the path according to your project structure

const app: Application = express();
const port = configKeys.PORT;

// Middleware and route configuration (adjust as needed)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});


const startServer = () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

// Connect to MongoDB and start the server
connectDB().then(startServer).catch((error) => {
    console.error('Failed to connect to the database and start the server', error);
});

import express, { Request, Response, NextFunction } from 'express';
import { startServer } from './startServer';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import errorMiddleware from './middlewares/errorMiddleware';
import routes from './routes/index';

const app = express()

app.use(bodyParser.json());
app.use(cors())
app.use(logger('dev'))
app.use(routes);
app.use(express.json())


app.get("/", (req : Request,res : Response, next :NextFunction) =>{
       
    res.status(200).send("hi this is from server");
})

startServer(app);

app.use(errorMiddleware);

// Uncaught Exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error ${err.message}`);
    console.log("Shutting down the server due to uncaught Exceptions");
    process.exit(1);
});

// Unhandled Promise Rejections
process.on("unhandledRejection", (err : any) => {
    console.log(`Error ${err.message}`);
    console.log("Shutting down the server due to unhandled Promise Rejection");
    process.exit(1);
});

import express, { Request, Response, NextFunction } from 'express';
import { startServer } from './startServer';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express()

app.use(bodyParser.json());
app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.get("/", (req : Request,res : Response, next :NextFunction) =>{
       
    res.status(200).send("hi this is from server");
})

startServer(app);

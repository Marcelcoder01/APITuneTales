const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/user.routers");
const errorHandling = require ("./error/errorHandling");
const multer =  require ('multer');

const app = express();

const corsOptions = {     
    methods: ['GET', 'POST', 'PUT', 'DELETE'],     
    allowedHeaders: ['Content-Type', 'Authorization'],     
    optionsSuccessStatus: 204,     
    maxAge: 500,     
    "Access-Control-Allow-Origin": ['http://localhost:4200','https://tune-tales.vercel.app', '*' ] 
}
app.use(cors(corsOptions));

// app.use(cors());
// app.use(cors(corsOptions));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(userRouter);
app.use((req, res, next)=>{
    res.status(404).json({
        error:true,
        codigo:404,
        mensaje:"Endpoint no encontrado"
    })
});
app.use(errorHandling);
app.use(multer);
module.exports = app;


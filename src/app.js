const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/user.routers");
const errorHandling = require ("./error/errorHandling");
const multer =  require ('multer');

const app = express();

const corsOptions = {
    origin: "https://tune-tales.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
};

// Configurar cabeceras CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Esto permite solicitudes desde cualquier origen. Ajusta esto según tus necesidades de seguridad.
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(cors());
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
})

app.use(errorHandling);
app.use(multer);


module.exports = app;
import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import Route from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";


const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use("/",Route); 

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
Connection();
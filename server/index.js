import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js';

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.get('/' , (req , res)=>{
    res.send("This is the backend server of Coding Comunity Website");
});


connectDB().then(() => {
    app.listen(PORT , () => {
        console.log(`Server running on port http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.log("Internal Server Error "  + err.message);
}) 

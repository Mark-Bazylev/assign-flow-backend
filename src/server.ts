import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()


import errorHandlerMiddleware from './middleware/error-handler'

import authRouter from './routes/auth'

const app = express();

app.use(cors());
app.use(express.json());



app.use("/api/auth",authRouter);

app.use(errorHandlerMiddleware);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

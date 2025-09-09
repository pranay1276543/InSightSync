import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectdb from './config/mongodb.js'
import authRouter from './routes/authRoutes.js'
import transporter from './config/nodemailer.js'
import userRouter from './routes/userRoutes.js'
import uploadRouter from './routes/uploadRoutes.js'


const app = express()
const port = process.env.PORT || 4000
connectdb()

const allowedOrigins = 'https://insightsync-67f8.onrender.com'
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:allowedOrigins,credentials:true}))

transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP Verification Error:", error);
    } else {
        console.log("SMTP Server is ready to send emails");
    }
});


app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/upload',uploadRouter)

app.listen(port,()=>{
    console.log(`Server started at port: ${port}`)
})

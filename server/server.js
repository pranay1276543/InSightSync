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

// Configure allowed origins from env (supports comma-separated list)
const clientOriginsEnv = process.env.CLIENT_URL || ''
const allowedOrigins = clientOriginsEnv.split(',').map(o => o.trim()).filter(Boolean)
app.set('trust proxy', 1)
app.use(cors({
	origin: function (origin, callback) {
		if (!origin) return callback(null, true)
		if (allowedOrigins.includes(origin)) {
			return callback(null, true)
		}
		return callback(new Error('Not allowed by CORS'))
	},
	credentials: true
}))
app.use(express.json())
app.use(cookieParser())


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

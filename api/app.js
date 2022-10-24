const express = require('express')
const cors = require('cors')
const app = express() // Initializing express
const dotenv = require('dotenv').config({ path: '../.env' })
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const colors = require('colors')

const db = require('./config/db')


const { errorHandler } = require('./middleware/errorMiddleware')
/*routes */
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')

const port = process.env.PORT || 5000
app.use(cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
        credentials: true,
        allowedHeaders: [
                'Content-Type',
                'Access'
        ]
}))

// MongoDB connection check
db.connect((err) => {
        if (err) console.log("Connection Error");
        else console.log('Database connected')
})

/* Middlewares */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', userRouter)
app.use('/admin', adminRouter)

app.use(errorHandler)

app.listen(port, () => console.log(`Server is connected to port ${port}`))
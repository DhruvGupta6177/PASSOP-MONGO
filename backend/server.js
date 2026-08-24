const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 3000
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017'
const nodeEnv = process.env.NODE_ENV || 'development'

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', environment: nodeEnv })
})

app.get('/', (req, res) => {
  res.json({ message: 'PassOP API Server', version: '1.0.0' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(port, () => {
  console.log(`Server running in ${nodeEnv} mode`)
  console.log(`Listening on port ${port}`)
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`)
  console.log(`MongoDB URI: ${mongoUri}`)
})
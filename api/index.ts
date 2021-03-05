import express from 'express'

// Require API routes
import users from './routes/users'
import test from './routes/test'

// Create express instance
const app = express()

// Import API Routes
app.use(users)
app.use(test)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}

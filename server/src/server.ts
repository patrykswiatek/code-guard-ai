import 'dotenv/config'

import express from 'express'
import { createServer } from 'http'
import { webSocketServer } from './websocketServer'
// import { processRepositoryChanges } from './features/processRepositoryChanges'

const { PORT } = process.env

if (!PORT) throw new Error('The PORT environment variable is not set.')

const app = express()
const server = createServer(app)
const wsServer = webSocketServer(server);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT} 🎉`);
  // processRepositoryChanges()
})

export default wsServer;

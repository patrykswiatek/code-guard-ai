import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { processRepositoryChanges } from '@/features/processRepositoryChanges'
import { getNonDeletedChangedFilesForSelection } from '@/features/getNonDeletedChangedFilesForSelection'
import { ApiUrl } from '@repo/types'
import expressWs from 'express-ws'

const { PORT } = process.env

if (!PORT) {
  console.error('The PORT environment variable is not set.')
  process.exit(1)
}

const app = express()
const { app: appWithWs } = expressWs(app)

appWithWs.use(cors())
appWithWs.use(express.json())

appWithWs.get(ApiUrl.RepositoryFiles, async (_, res) => {
  const filesToSelect = await getNonDeletedChangedFilesForSelection()
  res.json(filesToSelect)
})

appWithWs.ws(ApiUrl.RepositoryProcessChanges, (ws) => {
  ws.on('message', async (message) => {
    if (!message || typeof message !== 'string') return
    const selectedFiles = JSON.parse(message)
    await processRepositoryChanges(selectedFiles, ws)
  })

  ws.on('close', () => console.log('WebSocket was closed'))
})

appWithWs.listen(PORT, () => {
  console.log(`Server started on port ${PORT} 🎉`)
})

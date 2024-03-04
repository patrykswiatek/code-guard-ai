import { ApiUrl } from '@repo/types'
import express from 'express'

const router = express.Router()

router.post(ApiUrl.UserAIConfig, (req, res) => {
  const apiKey = req.body.apiKey
  const model = req.body.model
})

router.post(ApiUrl.UserProjectDirectory, (req, res) => {
  const directory = req.body.directory

  req.session.user = {
    ...(req.session.user ?? {}),
    projectDirectory: directory,
  }
})

export default router

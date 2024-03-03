import { ApiUrl } from '@repo/types'
import express from 'express'
const router = express.Router()

router.post(ApiUrl.UserProjectDirectory, (req, res) => {
  const directory = req.body.directory

  req.session.user = {
    ...(req.session.user ?? {}),
    projectDirectory: directory,
  }
})

router.post(ApiUrl.UserOpenAiModel, (req, res) => {
  const model = req.body.model
})

router.post(ApiUrl.UserApiKey, (req, res) => {
  const apiKey = req.body.apiKey
})

export default router

import axios from '@/api/axios-client'
import { ApiUrl } from '@repo/types'
import { AIConfigFormValues } from '@/types/props/ai-config-form'

export const getRepositoryFiles = () => {
  return axios.get(ApiUrl.RepositoryFiles)
}

export const sendOpenAiData = (config: AIConfigFormValues) => {
  return axios.post(ApiUrl.UserAIConfig, config)
}

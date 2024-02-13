import axios from '@/api/axios-client'
import { ApiUrl } from '@repo/types'

export const getRepositoryFiles = () => {
  return axios.get(ApiUrl.RepositoryFiles)
}

import { ComponentProps } from 'react'
import { OPEN_AI_MODELS } from '@/constants/open-ai-models'

export interface AIConfigFormProps
  extends Pick<ComponentProps<'div'>, 'className'> {}

export interface AIConfigFormValues {
  apiKey: string
  model: (typeof OPEN_AI_MODELS)[number]
}

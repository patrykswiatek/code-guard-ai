import { OpenAI } from 'openai'
import { logAndRethrowError } from '@/utils/log-and-rethrow-error'
import websocketServer from '@/server'

const { OPEN_AI_API_KEY, OPEN_AI_MODEL } = process.env

if (!OPEN_AI_API_KEY) {
  throw new Error('The OPENAI_API_KEY environment variable is not set.')
}
if (!OPEN_AI_MODEL) {
  throw new Error('The OPEN_AI_MODEL environment variable is not set.')
}

const openAI = new OpenAI({ apiKey: OPEN_AI_API_KEY })

export const generateCodeSuggestions = async (
  prompt: string,
  codeSnippet: string
) => {
  if (typeof prompt !== 'string' || typeof codeSnippet !== 'string') {
    throw new TypeError('Both prompt and codeSnippet must be strings.')
  }

  try {
    const suggestionStream = await openAI.chat.completions.create({
      model: OPEN_AI_MODEL,
      messages: [{ role: 'user', content: `${prompt}\n\n${codeSnippet}` }],
      stream: true,
      temperature: 0.5,
    })

    for await (const message of suggestionStream) {
      const suggestion = message.choices[0]?.delta?.content || ''
      websocketServer.sendToClient(suggestion)
    }
  } catch (error) {
    logAndRethrowError(error)
  }
}

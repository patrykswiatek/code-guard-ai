import { OpenAI } from 'openai';
import { handleError } from '../utils/handle-error';

const { OPEN_AI_API_KEY, OPEN_AI_MODEL } = process.env

if (!OPEN_AI_API_KEY) throw new Error('The OPENAI_API_KEY environment variable is not set.')
if (!OPEN_AI_MODEL) throw new Error('The OPEN_AI_MODEL environment variable is not set.')

const openai = new OpenAI({ apiKey: OPEN_AI_API_KEY })

export const generateCompletionWithOpenAI = async (question: string, code: string) => {
  if (typeof question !== 'string' || typeof code !== 'string') {
    throw new TypeError('The question and code must be strings.')
  }

  try {
    const completionStream = await openai.chat.completions.create({
      model: OPEN_AI_MODEL,
      messages: [{ role: 'user', content: `${question}\n\n${code}` }],
      stream: true,
      temperature: 0.5,
    });

    for await (const completionChunk of completionStream) {
      const completionContent = completionChunk.choices[0]?.delta?.content || ''
      process.stdout.write(completionContent)
    }
  } catch (error) {
    handleError(error)
  }
}

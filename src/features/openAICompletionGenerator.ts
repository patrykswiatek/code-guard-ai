import { OpenAI } from 'openai';
import { handleError } from '../utils/handle-error';

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error('The OPENAI_API_KEY environment variable is not set.');

const openai = new OpenAI({ apiKey });

export const generateCompletionWithOpenAI = async (question: string, code: string) => {
  if (typeof question !== 'string' || typeof code !== 'string') {
    throw new TypeError('The question and code must be strings.');
  }

  try {
    const completionStream = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: `${question}\n\n${code}` }],
      stream: true,
      temperature: 0.5,
    });

    for await (const completionChunk of completionStream) {
      const completionContent = completionChunk.choices[0]?.delta?.content || '';
      process.stdout.write(completionContent);
    }
  } catch (error) {
    handleError(error)
  }
}

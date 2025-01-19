import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = streamText({
    model: openai('gpt-4-turbo'),
    system: "You are a helpful financial advisor AI assistant. Provide advice and explanations on financial topics, budgeting, investing, and money management. Be friendly, informative, and encourage good financial habits.",
    messages,
  })

  return result.toDataStreamResponse()
}


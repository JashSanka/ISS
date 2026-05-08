import { AI_MODEL, API_BASE_URLS, HF_ROUTER_AI_MODEL } from '../../../constants/api'
import { createHttpClient } from '../../../services/http/axiosClient'
import { toAppError } from '../../../services/http/apiErrors'
import { requireEnvValue } from '../../../utils/env/env'
import type { ChatRequest } from '../types/chatbot.types'
import { buildDashboardPrompt } from '../utils/buildDashboardPrompt'
import { constrainUnsupportedAnswer } from '../utils/chatbotGuards'

const huggingFaceClient = createHttpClient(API_BASE_URLS.ai)

type HuggingFaceTextGenerationResponse =
  | {
      choices?: Array<{
        message?: {
          content?: string
        }
      }>
      error?: {
        message?: string
      }
    }
  | {
      error?: string
    }

export const aiService = {
  model: AI_MODEL,
  async askDashboardQuestion({ context, question }: ChatRequest) {
    try {
      const token = requireEnvValue('VITE_AI_TOKEN')
      const prompt = buildDashboardPrompt(question, context)
      const response = await huggingFaceClient.post<HuggingFaceTextGenerationResponse>(
        '/v1/chat/completions',
        {
          max_tokens: 220,
          messages: [{ content: prompt, role: 'user' }],
          model: HF_ROUTER_AI_MODEL,
          temperature: 0.2,
          top_p: 0.9,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const answer = extractGeneratedText(response.data)

      if (!answer) {
        throw new Error('The AI service did not return a usable response.')
      }

      return constrainUnsupportedAnswer(answer)
    } catch (error) {
      const appError = toAppError(error, 'Unable to contact the AI service.')
      const message =
        appError.status === 401
          ? 'AI request was unauthorized. Check that VITE_AI_TOKEN is a valid Hugging Face token with Make calls to Inference Providers permission.'
          : appError.message

      throw new Error(message, { cause: error })
    }
  },
}

function extractGeneratedText(response: HuggingFaceTextGenerationResponse) {
  if (typeof response.error === 'string') {
    throw new Error(response.error)
  }

  if (typeof response.error === 'object' && response.error?.message) {
    throw new Error(response.error.message)
  }

  if ('choices' in response) {
    return response.choices?.[0]?.message?.content?.trim()
  }

  return undefined
}

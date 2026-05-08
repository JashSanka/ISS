import axios from 'axios'

export type AppError = {
  message: string
  status?: number
  code?: string
  retryable: boolean
}

export function toAppError(error: unknown, fallbackMessage = 'Something went wrong'): AppError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const isNetworkFailure = error.message === 'Network Error' || error.code === 'ERR_NETWORK'

    return {
      message: isNetworkFailure
        ? 'Network request failed. In local development this is usually caused by CORS, mixed-content blocking, or a blocked third-party API request. Restart the dev server so the Vite API proxy can take effect.'
        : error.message || fallbackMessage,
      status,
      code: error.code,
      retryable: !status || status >= 500 || status === 408 || status === 429,
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      retryable: true,
    }
  }

  return {
    message: fallbackMessage,
    retryable: true,
  }
}

import axios from 'axios'

export function createHttpClient(baseURL: string) {
  return axios.create({
    baseURL,
    timeout: 15_000,
    headers: {
      Accept: 'application/json',
    },
  })
}

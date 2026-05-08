export function getEnvValue(key: keyof ImportMetaEnv) {
  return import.meta.env[key]
}

export function requireEnvValue(key: keyof ImportMetaEnv) {
  const value = getEnvValue(key)

  if (!value) {
    throw new Error(`Missing required environment variable: ${String(key)}`)
  }

  return value
}

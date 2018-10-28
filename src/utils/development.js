export function inDevelopmentMode() {
  // eslint-disable-next-line
  return process.env.NODE_ENV === 'development'
}

export function inTestMode() {
  // eslint-disable-next-line
  return process.env.NODE_ENV === 'test'
}
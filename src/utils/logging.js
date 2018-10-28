import { inTestMode } from 'utils/development'

export function logEvent(eventName, data) {
  if (inTestMode()) {
    return
  }

  const args = [`Event: ${eventName}`]

  if (data) {
    args.push(data)
  }

  // eslint-disable-next-line
  console.log.apply(null, args)
}
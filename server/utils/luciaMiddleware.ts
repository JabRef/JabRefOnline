import type { Middleware } from 'lucia'

import { getCookie, getRequestURL, setCookie, type H3Event } from 'h3'

export function h3(): Middleware<[H3Event]> {
  return ({ args, sessionCookieName }) => {
    const [event] = args
    return {
      request: {
        url: getRequestURL(event).toString(),
        headers: event.headers,
        method: event.method,
      },
      sessionCookie: getCookie(event, sessionCookieName),
      setCookie: (cookie) => {
        setCookie(event, cookie.name, cookie.value, cookie.attributes)
      },
    }
  }
}

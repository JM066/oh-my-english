export const getCookie = (name: string): null | undefined | string => {
  if (typeof document === 'undefined') return null
  try {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')[1]
  } catch (err) {
    return null
  }
}

export const setCookie = (name: string, value: string, days: number): void => {
  if (typeof document === 'undefined') return
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/;`
}

export const deleteCookie = (name: string): void => {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

export default getCookie

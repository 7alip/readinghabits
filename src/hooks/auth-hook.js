import { useCallback, useEffect, useState } from 'react'

let logoutTimer

export const useAuth = () => {
  const [token, setToken] = useState()
  const [tokenExpirationState, setTokenExpirationState] = useState()
  const [userId, setUserId] = useState()

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token)
    setUserId(uid)

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 24000 * 7 * 60 * 60)

    setTokenExpirationState(tokenExpirationDate)

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token,
        expiration: tokenExpirationDate,
      }),
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setTokenExpirationState(null)
    setUserId(null)
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    if (token && tokenExpirationState) {
      const remainingTime =
        new Date(tokenExpirationState).getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenExpirationState])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, storedData.expiration)
    }
  }, [login])

  return { token, login, logout, userId }
}

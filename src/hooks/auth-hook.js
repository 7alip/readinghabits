import { useCallback, useEffect, useState } from 'react'

let logoutTimer
let resetLogoutTimer

export const useAuth = () => {
  const [token, setToken] = useState()
  const [resetToken, setResetToken] = useState()
  const [tokenExpirationState, setTokenExpirationState] = useState()
  const [resetTokenExpirationState, setResetTokenExpirationState] = useState()
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

  const forgot = useCallback((uid, resetToken, resetExpirationDate) => {
    setResetToken(resetToken)
    setUserId(uid)

    const resetTokenExpirationDate =
      resetExpirationDate || new Date(new Date().getTime() + 1000 * 60 * 5)

    setResetTokenExpirationState(resetTokenExpirationDate)

    localStorage.setItem(
      'resetData',
      JSON.stringify({
        userId: uid,
        resetToken,
        expiration: resetTokenExpirationDate,
      }),
    )
  }, [])

  const clearResetToken = useCallback(() => {
    setResetToken(null)
    setResetTokenExpirationState(null)
    setUserId(null)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setTokenExpirationState(null)
    setUserId(null)
    localStorage.removeItem('userData')
    clearResetToken()
  }, [])

  useEffect(() => {
    if (token && tokenExpirationState) {
      const remainingTime =
        new Date(tokenExpirationState).getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else if (resetToken && resetTokenExpirationState) {
      const resetRemainingTime =
        new Date(resetTokenExpirationState).getTime() - new Date().getTime()
      resetLogoutTimer = setTimeout(clearResetToken, resetRemainingTime)
    } else {
      clearTimeout(logoutTimer)
      clearTimeout(resetLogoutTimer)
    }
  }, [
    token,
    logout,
    tokenExpirationState,
    resetToken,
    resetTokenExpirationState,
    clearResetToken,
  ])

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

  return { token, login, logout, userId, forgot }
}

const keyPrefix = 'bp'

export const getLocalStorageItem = (key) => {
  return window.localStorage.getItem(`${keyPrefix}-${key}`)
}

export const setLocalStorageItem = (key, value) => {
  return window.localStorage.setItem(`${keyPrefix}-${key}`, value)
}

export const clearLocalStorageItem = (key) => {
  return window.localStorage.removeItem(`${keyPrefix}-${key}`)
}

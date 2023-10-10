const INFO_KEY = 'local_data'
const INFO_HISTORY = 'local_history'

export const getInfo = () => {
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : { token: '', userid: '' }
}

export const setInfo = (data) => {
  return localStorage.setItem(INFO_KEY, JSON.stringify(data))
}

export const removeInfo = () => {
  return localStorage.removeItem(INFO_KEY)
}

export const getHistory = () => {
  const result = localStorage.getItem(INFO_HISTORY)
  return result ? JSON.parse(result) : []
}

export const setHistory = (data) => {
  return localStorage.setItem(INFO_HISTORY, JSON.stringify(data))
}

export const removeHistory = () => {
  return localStorage.removeItem(INFO_HISTORY)
}

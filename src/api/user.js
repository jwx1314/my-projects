import request from '@/utils/request'

export const postRegister = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

export const postLogin = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}

export const getUserinfo = () => request.get('/my/userinfo')

import request from '@/util/request'

export const getaddress = () => {
  return request.get('/address/list')
}

export const addaddress = (name, phone, region, detail) => {
  return request.post('/address/add', {
    form: {
      name, phone, region, detail
    }
  })
}

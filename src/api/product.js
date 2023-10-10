import request from '@/util/request'

export const getproList = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      categoryId, goodsName, page
    }
  })
}

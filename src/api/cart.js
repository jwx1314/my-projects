import request from '@/util/request'

export const addcart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

export const getcartlist = () => {
  return request.post('/cart/list')
}

export const changecartlist = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId, goodsNum, goodsSkuId
  })
}

export const clearcartpro = (cartIds) => {
  return request.post('/cart/clear', { cartIds })
}

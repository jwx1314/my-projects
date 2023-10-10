import request from '@/util/request'

export const submit = (mode, remark, obj) => {
  return request.post('/checkout/submit', {
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    payType: 10,
    remark,
    mode,
    ...obj
  })
}

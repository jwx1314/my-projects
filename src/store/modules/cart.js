import { getcartlist, changecartlist, clearcartpro } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartlist: []
    }
  },
  mutations: {
    getlist (state, newlist) {
      state.cartlist = newlist
    },
    changecheck (state, goodsid) {
      const goods = state.cartlist.find(item => item.goods_id === goodsid)
      goods.ischecked = !goods.ischecked
    },
    allchangecheck (state, flag) {
      state.cartlist.forEach(item => { item.ischecked = flag })
    },
    updatecartlist (state, { goodsid, value, goodsskuid }) {
      const good = state.cartlist.find(item => item.goods_id === goodsid && item.goods_sku_id === goodsskuid)
      good.goods_num = value
    }

  },
  actions: {
    async getcartlist (context) {
      const { data } = await getcartlist()
      data.list.forEach(element => {
        element.ischecked = true
      })
      context.commit('getlist', data.list)
    },
    async changecount (context, obj) {
      const { goodsid, value, goodsskuid } = obj

      await changecartlist(goodsid, value, goodsskuid)

      context.commit('updatecartlist', { goodsid, value, goodsskuid })
    },
    async clearlistpro (context) {
      const clearlist = context.getters.selcartlist
      console.log(clearlist)
      const clearpro = clearlist.map(item => item.id)
      await clearcartpro(clearpro)
      Toast('删除成功！')
      context.dispatch('getcartlist')
    }
  },
  getters: {
    Countsum (state) {
      return state.cartlist.reduce((sum, item) => sum + item.goods_num, 0)
    },
    selcartlist (state) {
      return state.cartlist.filter(item => item.ischecked)
    },
    selcartnum (state, getters) {
      return getters.selcartlist.reduce((sum, item) => sum + item.goods_num, 0)
    },
    selcartsum (state, getters) {
      return getters.selcartlist.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    isallchecked (state) {
      return state.cartlist.every(item => item.ischecked)
    }

  }
}

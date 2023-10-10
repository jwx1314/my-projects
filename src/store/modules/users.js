import { getInfo, setInfo } from '@/util/storage'

export default {
  namespaced: true,
  state () {
    return {
      userinfo: getInfo()
    }
  },
  mutations: {
    saveuer (state, user) {
      state.userinfo = user
      setInfo(user)
    }
  }
}

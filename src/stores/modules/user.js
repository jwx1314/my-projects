import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserinfo } from '@/api/user'

export const useUserStore = defineStore(
  'users',
  () => {
    const token = ref('')
    const setToken = (newtoken) => {
      token.value = newtoken
    }
    const removeToken = () => {
      token.value = ''
    }

    const user = ref({})
    const getUser = async () => {
      const res = await getUserinfo()
      user.value = res.data.data
    }
    const setuser = (obj) => {
      user.value = obj
    }

    return {
      token,
      setToken,
      removeToken,
      getUser,
      setuser,
      user
    }
  },
  {
    persist: true
  }
)

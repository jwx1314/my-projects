<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" maxlength="11" placeholder="请输入手机号码" type="text" v-model="mobile">
        </div>
        <div class="form-item">
          <input class="inp" maxlength="5" placeholder="请输入图形验证码" type="text" v-model="picCode">
          <img v-if="picUrl" :src="picUrl" alt="" @click="getPicCode" >
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text"
              v-model="getmsg">
          <button @click="getMsgCode" v-if="second === secondtotle">获取验证码

          </button>
          <span v-else>{{ second + '秒后重新获取' }}</span>

        </div>
      </div>

      <div class="login-btn" @click="loginFn">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, loginMsg } from '@/api/login'
import { addaddress } from '@/api/address'
export default {
  name: 'LoginIndex',
  async created () {
    this.getPicCode()
  },

  data () {
    return {
      picCode: '',
      picKey: '',
      mobile: '',
      picUrl: '',
      second: 60,
      secondtotle: 60,
      timer: null,
      getmsg: ''
    }
  },

  methods: {
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
    },
    async getMsgCode () {
      if (!this.vailFn()) {
        return
      }
      if (!this.timer && this.second === this.secondtotle) {
        await getMsgCode(this.picCode, this.picKey, this.mobile)

        this.$toast('发送成功注意查收')
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.secondtotle
          }
        }, 1000)
      }
    },
    vailFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的验证码')
        return false
      }
      return true
    },
    async loginFn () {
      if (!this.vailFn) {
        return
      }
      if (!/^\d{6}$/.test(this.getmsg)) {
        this.$toast('请输入正确的短信验证码')
        return
      }

      const res = await loginMsg(this.mobile, this.getmsg)

      this.$store.commit('user/saveuer', res.data)
      const address = 0
      if (address === 0) {
        await addaddress('久违心', 15002895845,
          [{ value: 123, label: '四川省' }, { value: 124, label: '成都市' }, { value: 125, label: '成华区' }], '昭青横路20号')
        this.address += 1
      }

      this.$toast('登陆成功')
      const urlback = this.$route.query.urlback || '/'
      this.$router.replace(urlback)
    },
    destroyed () {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

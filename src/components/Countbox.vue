<template>
  <div class="main">
    <button class="sub" :disabled="butdisabled" @click="subFn">-</button>
    <input type="text" class="inp" @change="handleChange" :value="value">
    <button class="add" @click="addFn">+</button>
  </div>
</template>

<script>
export default {
  name: 'CountBox',
  data () {
    return {
      butdisabled: false
    }
  },
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    subFn () {
      if (this.value > 1) {
        this.$emit('input', this.value - 1)
      }
      if (this.value === 1) {
        this.butdisabled = true
      }
    },
    addFn () {
      if (this.value === 1) {
        this.butdisabled = false
      }
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
      const num = +e.target.value
      if (isNaN(num) || num < 0) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less">
.main{
    display: flex;
    width: 110px;
    button{
        width: 30px;
        height: 30px;
        outline: none;
        border: none;
        background-color: #efefef;

    }
    .inp{
        margin: 0 5px;
        width: 40px;
        height: 30px;
        outline: none;
        border: none;
        text-align: center;
        background-color: #efefef;
    }
}
</style>

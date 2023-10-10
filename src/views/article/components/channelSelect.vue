<script setup>
import { getArticleChannel } from '@/api/article'
import { ref } from 'vue'
defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue'])
const channelList = ref([])

const getChannelList = async () => {
  const {
    data: { data }
  } = await getArticleChannel()

  channelList.value = data
}

getChannelList()
</script>

<template>
  <el-select
    width:100px
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <el-option
      :label="item.cate_name"
      :value="item.id"
      v-for="item in channelList"
      :key="item.id"
    ></el-option>
  </el-select>
</template>

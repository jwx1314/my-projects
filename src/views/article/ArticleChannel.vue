<script setup>
import { getArticleChannel, PostDeleteArticleChannel } from '@/api/article'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import channelEdit from './components/channelEdit.vue'

const channelList = ref([])
const loading = ref(false)
const dialog = ref()

const getChannelList = async () => {
  loading.value = true
  const res = await getArticleChannel()
  channelList.value = res.data.data
  loading.value = false
}

//增删改操作
const handleEdit = (row) => {
  dialog.value.open(row)
}
const addArticle = () => {
  dialog.value.open({})
}
const handleDelete = async (row) => {
  await ElMessageBox.confirm('你确定要删除此分类吗?（此操作不可逆）', '警告', {
    confirmButtonText: '删除',
    cancelButtonText: '关闭',
    type: 'warning'
  })
    .then(async () => {
      await PostDeleteArticleChannel(row.id)
      ElMessage({
        message: '删除成功',
        type: 'success',
        offset: 200
      })
      getChannelList()
    })
    .catch(() => {})
}
const update = () => {
  getChannelList()
}
// const addform = ref({
//   cate_name: '',
//   cate_alias: ''
// })
// const handlerAddArticle = async () => {
//   loading.value = true
//   await PostaddArticleChannel(addform.value)
//   loading.value = false
//   dialogFormVisible.value = false
//   ElMessage({
//     message: '添加成功',
//     type: 'success',
//     offset: 200
//   })
//   getChannelList()
// }
getChannelList()
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="addArticle">添加分类</el-button>
    </template>

    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column prop="" label="操作" width="100">
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            @click="handleEdit(row)"
            circle
            plain
          ></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            plain
            @click="handleDelete(row)"
            circle
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty :image-size="200" />
      </template>
    </el-table>

    <!-- 弹层 -->
    <channelEdit ref="dialog" @update="update"> </channelEdit>
  </page-container>
</template>

<style lang="scss" scoped></style>

<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import channelSelect from './components/channelSelect.vue'
import articleEditDialog from './components/articleEditDialog.vue'
import articleEditDrawer from './components/articleEditDrawer.vue'
import { DeleteArticle } from '@/api/article'

import { GetArticleListService } from '@/api/article'
import { timeFormat } from '@/utils/timeFormat'
import { ElMessage } from 'element-plus'

const loading = ref(false)

const ArticleList = ref([])
const total = ref(0)
const GetArticleList = async () => {
  loading.value = true
  const { data } = await GetArticleListService(postParams.value)
  ArticleList.value = data.data
  total.value = data.total
  loading.value = false
}

const postParams = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
//页码变化
const handleSizeChange = (size) => {
  postParams.value.pagesize = size
  postParams.value.pagenum = 1

  update()
}
const handleCurrentChange = (page) => {
  postParams.value.pagenum = page

  update()
}
//搜索与重置
const onSearch = () => {
  postParams.value.pagenum = 1
  update()
}
const onReset = () => {
  postParams.value.cate_id = ''
  postParams.value.state = ''
  postParams.value.pagenum = 1
  update()
}
//Diglog表单
const dialog = ref()
const openDialogWithAdd = () => {
  dialog.value.open({ AddOrEdit: 'Add' })
}
const openDialogWithEdit = (row) => {
  dialog.value.open(row)
}

//Drawer表单
const drawer = ref()
const openDrawerWithAdd = () => {
  drawer.value.open({ AddOrEdit: 'Add' })
}
const openDrawerWithEdit = (row) => {
  drawer.value.open(row)
}

//更新数据
const onSuccess = (type) => {
  if (type === 'add') {
    const lastPagenum = Math.ceil((total.value + 1) / postParams.value.pagesize)
    postParams.value.pagenum = lastPagenum
  }
  GetArticleList()
}

const handleDelete = async (row) => {
  await ElMessageBox.confirm('你确定要删除此分类吗?（此操作不可逆）', '警告', {
    confirmButtonText: '删除',
    cancelButtonText: '关闭',
    type: 'warning'
  })
    .then(async () => {
      await DeleteArticle(row.id)
      ElMessage({
        message: '删除成功',
        type: 'success',
        offset: 200
      })
      update()
    })
    .catch(() => {})
}
const update = () => {
  GetArticleList()
}
GetArticleList()
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="openDialogWithAdd" auto-insert-space
        >发布文章（表单）</el-button
      >
      <el-button type="success" @click="openDrawerWithAdd" auto-insert-space
        >发布文章（抽屉）</el-button
      >
    </template>
    <el-form inline>
      <el-form-item label="文章分类">
        <channelSelect v-model="postParams.cate_id"></channelSelect>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select v-model="postParams.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table style="width: 100%" v-loading="loading" :data="ArticleList">
      <el-table-column prop="title" label="文章标题" width="400">
        <template #default="{ row }">
          <el-link type="primary">{{ row.title }}</el-link>
        </template></el-table-column
      >
      <el-table-column prop="cate_name" label="分类"> </el-table-column>
      <el-table-column prop="pub_date" label="发表时间">
        <template #default="{ row }"> {{ timeFormat(row.pub_date) }}</template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作" width="200" center>
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            @click="openDialogWithEdit(row)"
            circle
            plain
          ></el-button>
          <el-button
            type="success"
            :icon="Edit"
            @click="openDrawerWithEdit(row)"
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
        <el-empty :image-size="200"></el-empty>
      </template>
    </el-table>

    <el-pagination
      v-model:current-page="postParams.pagenum"
      v-model:page-size="postParams.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper,total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="justify-content: flex-end"
    />

    <articleEditDialog ref="dialog" @success="onSuccess"></articleEditDialog>
    <articleEditDrawer ref="drawer" @success="onSuccess"></articleEditDrawer>
  </page-container>
</template>

<style lang="scss" scoped></style>

<script setup>
import { ref, defineEmits } from 'vue'
import { PostaddArticleChannel, PutUpdateArticleChannel } from '@/api/article'
const emit = defineEmits(['update'])
const refForm = ref() //表单实例，用于提取校验方法validate()
const rules = {
  cate_name: [
    { required: true, message: '分类名不能为空', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名为1-10非空字符！',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '分类名不能为空', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名由1-15数字字母组成！',
      trigger: 'blur'
    }
  ]
}

const dialogFormVisible = ref(false)
const form = ref({
  cate_name: '',
  cate_alias: '',
  id: ''
})
const open = (row) => {
  form.value = { ...row }
  dialogFormVisible.value = true
}

const handlerAddArticle = async () => {
  await refForm.value.validate()
  await PostaddArticleChannel(form.value)
  dialogFormVisible.value = false
  ElMessage({
    message: '添加成功',
    type: 'success',
    offset: 200
  })
  emit('update')
} //添加分类方法
const handlerEditArticle = async () => {
  await refForm.value.validate()
  await PutUpdateArticleChannel(form.value)
  dialogFormVisible.value = false
  ElMessage({
    message: '编辑成功',
    type: 'success',
    offset: 200
  })
  emit('update')
} //修改分类方法
defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="form.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <el-form
      :model="form"
      label-width="100px"
      style="padding-right: 30px"
      :rules="rules"
      ref="refForm"
    >
      <el-form-item
        label="分类名称"
        :label-width="formLabelWidth"
        prop="cate_name"
      >
        <el-input
          v-model="form.cate_name"
          autocomplete="off"
          placeholder="请输入分类名称"
        />
      </el-form-item>
      <el-form-item
        label="分类别名"
        :label-width="formLabelWidth"
        prop="cate_alias"
      >
        <el-input
          v-model="form.cate_alias"
          autocomplete="off"
          placeholder="请输入分类别名"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="form.id ? handlerEditArticle() : handlerAddArticle()"
        >
          {{ form.id ? '编辑' : '添加' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>

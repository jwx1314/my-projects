<script setup>
import { ref } from 'vue'
import channelSelect from './channelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { PostArticle, GetArticleDetail, PutUpdateArticle } from '@/api/article'
import { baseURL } from '@/utils/request'
import axios from 'axios'

const refeditor = ref()
const emit = defineEmits(['success'])
const visiableDrawer = ref(false)
const loading = ref(false)
const open = async (row) => {
  visiableDrawer.value = true
  if (row.AddOrEdit !== 'Add') {
    form.value.AddOrEdit = ''
    loading.value = true
    const {
      data: { data }
    } = await GetArticleDetail(row.id)
    form.value = data
    imageUrl.value = baseURL + form.value.cover_img
    const file = await imageUrlToFile(imageUrl.value, form.value.cover_img)
    form.value.cover_img = file
    loading.value = false
  } else {
    form.value = { ...row }
    imageUrl.value = ''
    refeditor.value.setHTML('')
  }
}

const refForm = ref()
const form = ref({
  title: '',
  cate_id: '',
  content: '',
  state: '',
  cover_img: '',
  AddOrEdit: ''
})

const rules = {
  title: [
    { required: true, message: '标题不能为空', trigger: 'change' },
    {
      pattern: /^\S{5,10}$/,
      message: '标题为5-10个非空字符',
      trigger: 'change'
    }
  ],
  content: [
    { required: true, message: '内容不能为空', trigger: 'change' },
    { pattern: /^\S{1,200}$/, message: '内容不能大于200字', trigger: 'change' }
  ],
  state: [{ required: true, message: '请选择发布状态', trigger: 'change' }],
  cate_id: [{ required: true, message: '请选择分类', trigger: 'change' }],
  cover_img: [
    { required: true, message: '请输入图片URL', trigger: 'change', type: File }
  ]
}

const imageUrl = ref('')
const onSelectFile = (uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  form.value.cover_img = uploadFile.raw
}
const onPublish = async (state) => {
  await refForm.value.validate()
  form.value.state = state
  const fd = new FormData()
  for (let key in form.value) {
    fd.append(key, form.value[key])
  }

  if (form.value.AddOrEdit === 'Add') {
    await PostArticle(fd)
    ElMessage({
      message: '发布成功',
      type: 'success',
      offset: 200
    })
    emit('success', 'add')
    imageUrl.value = ''
    refeditor.value.setHTML('')
    visiableDrawer.value = false
  } else {
    await PutUpdateArticle(fd)
    ElMessage({
      message: '修改成功',
      type: 'success',
      offset: 200
    })
    emit('success', 'Edit')
    imageUrl.value = ''
    refeditor.value.setHTML('')
    visiableDrawer.value = false
  }
}

async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer
    :title="form.AddOrEdit ? '添加文章' : '编辑文章'"
    v-model="visiableDrawer"
    size="50%"
    direction="rtl"
  >
    <el-form
      :model="form"
      label-width="100px"
      style="padding-right: 30px"
      :rules="rules"
      ref="refForm"
      v-loading="loading"
    >
      <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
        <el-input
          v-model="form.title"
          autocomplete="off"
          placeholder="请输入标题"
        />
      </el-form-item>
      <el-form-item label="分类" prop="cate_id">
        <channelSelect v-model="form.cate_id" width="100%"></channelSelect>
      </el-form-item>
      <el-form-item label="图片" :label-width="formLabelWidth" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
        <div class="editor">
          <quill-editor
            theme="snow"
            v-model:content="form.content"
            content-type="html"
            ref="refeditor"
          ></quill-editor>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>

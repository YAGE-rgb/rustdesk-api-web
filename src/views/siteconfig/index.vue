<template>
  <div class="site-settings">
    <el-card>
      <template #header>
        <span>站点设置</span>
      </template>
      <el-form :model="form" label-width="120px">
        <el-form-item label="网站标题">
          <el-input v-model="form.title" placeholder="请输入网站标题" />
        </el-form-item>
        <el-form-item label="欢迎语">
          <el-input
            v-model="form.hello"
            type="textarea"
            :rows="4"
            placeholder="请输入欢迎语，支持 HTML"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="loading">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'

const form = ref({
  title: '',
  hello: ''
})

const loading = ref(false)

const fetchConfig = async () => {
  try {
    const res = await request({
      url: '/config/admin',
      method: 'get'
    })
    if (res.code === 0) {
      form.value.title = res.data.title || ''
      form.value.hello = res.data.hello || ''
    }
  } catch (e) {
    console.error(e)
  }
}

const handleSave = async () => {
  loading.value = true
  try {
    const res = await request({
      url: '/config/admin',
      method: 'put',
      data: form.value
    })
    if (res.code === 0) {
      ElMessage.success('保存成功')
    } else {
      ElMessage.error(res.message || '保存失败')
    }
  } catch (e) {
    ElMessage.error('保存失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchConfig()
})
</script>

<style scoped>
.site-settings {
  padding: 20px;
}
</style>

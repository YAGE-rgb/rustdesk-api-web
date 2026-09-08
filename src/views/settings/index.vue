<template>
  <div class="settings-container">
    <el-card class="settings-card">
      <template #header>
        <span>站点设置</span>
      </template>
      <el-form :model="form" label-width="100px" class="settings-form">
        <el-form-item label="页面标题">
          <el-input v-model="form.title" placeholder="请输入页面标题" />
        </el-form-item>
        <el-form-item label="欢迎语">
          <el-input
            v-model="form.hello"
            type="textarea"
            :rows="4"
            placeholder="请输入欢迎语，支持 {{username}} 变量"
          />
          <div class="form-tip">留空则不显示欢迎语；支持使用 {{username}} 显示当前用户名</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="loading">保存</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { admin, updateAdmin } from '@/api/config'

const form = reactive({
  title: '',
  hello: '',
})

const loading = ref(false)

const loadConfig = async () => {
  try {
    const res = await admin()
    if (res.data) {
      form.title = res.data.title || ''
      form.hello = res.data.hello || ''
    }
  } catch (e) {
    console.error('加载配置失败', e)
  }
}

const handleSave = async () => {
  loading.value = true
  try {
    await updateAdmin({
      title: form.title,
      hello: form.hello,
    })
    ElMessage.success('保存成功，刷新页面后生效')
  } catch (e) {
    ElMessage.error('保存失败')
  } finally {
    loading.value = false
  }
}

const handleReset = () => {
  loadConfig()
}

onMounted(() => {
  loadConfig()
})
</script>

<style scoped lang="scss">
.settings-container {
  padding: 20px;
}

.settings-card {
  max-width: 600px;
}

.settings-form {
  .form-tip {
    font-size: 12px;
    color: #909399;
    margin-top: 5px;
  }
}
</style>

<template>
  <div class="settings-container">
    <el-card class="settings-card">
      <template #header>
        <span>{{ T('SiteSettings') }}</span>
      </template>
      <el-form :model="form" label-width="100px" class="settings-form">
        <el-form-item :label="T('SiteTitle')">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item :label="T('WelcomeMessage')">
          <el-input
            v-model="form.hello"
            type="textarea"
            :rows="4"
          />
          <div class="form-tip">{{ T('WelcomeTip') }}</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="loading">{{ T('Save') }}</el-button>
          <el-button @click="handleReset">{{ T('Reset') }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { admin, updateAdmin } from '@/api/config'
import { T } from '@/utils/i18n'

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
    console.error('load config failed', e)
  }
}

const handleSave = async () => {
  loading.value = true
  try {
    await updateAdmin({
      title: form.title,
      hello: form.hello,
    })
    ElMessage.success('Save success, refresh to take effect')
  } catch (e) {
    ElMessage.error('Save failed')
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

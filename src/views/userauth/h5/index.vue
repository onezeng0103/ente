<script setup>
import { useRouter } from 'vue-router'
import { storageDict } from '@/config/dict'
import { uploadImg } from '@/api/common/index.js'
import { ElNotification } from 'element-plus'
import { uploadKYC, getAreaCode } from '@/api/user'
import navigation from '@/component/h5/navigation/index.vue'

const router = useRouter()
// 区号列表
const areaList = ref([])
// 获取区号
const codeList = () => {
  let arr = []
  getAreaCode().then((res) => {
    if (res.code == '200') {
      res.data.forEach((item) => {
        item.data.forEach((item) => {
          arr.push({
            ...item
          })
        })
      })
      areaList.value = arr
    }
  })
}
const current = ref(localStorage.getItem(storageDict.LANGUAGE))
const action = ref({})
const formRef = useTemplateRef('formRef')
const formData = ref({
  action: '',
  userName: '',
  title: '',
  type: '',
  number: '',
  fileList: [],
  fileList2: []
})
const rules = ref({
  action: [{ required: true, message: '请选择居住国家' }],
  type: [{ required: true, message: '请选择证件类型' }],
  userName: [{ required: true, message: '请输入姓名' }],
  number: [{ required: true, message: '请输入证件号' }],
  fileList: [{ required: true, message: '请上传证件照正面' }],
  fileList2: [{ required: true, message: '请上传证件照反面' }]
})
const certificate = [
  { name: '身份证', type: 1 }, //身份证
  { name: '护照', type: 2 }, //护照
  { name: '驾驶证', type: 3 } //驾驶证
]
const handleActionChange = (value) => {
  formData.value.action = value
  action.value = areaList.value.find((item) => item.phoneCode == value)
}
const handleTypeChange = (value) => {
  formData.value.type = value
  formData.value.title = certificate.find((item) => item.type == value)?.name
}
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isImage) {
    ElNotification({
      title: '只能上传图片格式文件',
      type: 'error'
    })
    return false
  }
  if (!isLt2M) {
    ElNotification({
      title: '图片大小不能超过 2MB',
      type: 'error'
    })
    return false
  }
  return true
}
const customUpload = async (option) => {
  const formDatas = new FormData()
  formDatas.append('file', option.file)
  uploadImg(formDatas).then((res) => {
    res = res.data
    if (res.code == '200') {
      formData.value.fileList.push({
        name: option.file.name,
        url: res.data.url
      })
    } else {
      ElNotification({
        title: res.msg,
        type: 'error'
      })
    }
  })
}
const removeImg = () => {
  formData.value.fileList = []
}
const customUpload2 = async (option) => {
  const formDatas = new FormData()
  formDatas.append('file', option.file)
  uploadImg(formDatas).then((res) => {
    res = res.data
    if (res.code == '200') {
      formData.value.fileList2.push({
        name: option.file.name,
        url: res.data.url
      })
    } else {
      ElNotification({
        title: res.msg,
        type: 'error'
      })
    }
  })
}
const removeImg2 = () => {
  formData.value.fileList2 = []
}
const submit = async () => {
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      const file1 = formData.value.fileList[0] || {}
      let filePath1 = file1.url
      const file2 = formData.value.fileList2[0] || {}
      let filePath2 = file2.url
      let params = `realName=${formData.value.userName}&idCard=${formData.value.number}&flag=2&frontUrl=${filePath1}&backUrl=${filePath2}&country=${action.value.englishName}&cardType=${formData.value.type}`
      uploadKYC(params).then((res) => {
        if (res.code == '200') {
          ElNotification({
            title: '提交成功',
            type: 'success'
          })
          router.back()
        } else {
          ElNotification({
            title: res.msg,
            type: 'error'
          })
        }
      })
    }
  })
  return
}
onMounted(() => {
  codeList()
})
</script>

<template>
  <navigation title="KYC认证"></navigation>
  <div class="userauth">
    <div class="mobile-identity pb-10">
      <section class="content">
        <div class="info">
          <el-form :model="formData" :rules="rules" ref="formRef" label-position="top">
            <el-form-item prop="action">
              <template #label>居住国家/地区</template>
              <el-select
                placeholder="请选择"
                v-model="formData.action"
                style="width: 100%"
                @change="handleActionChange"
              >
                <el-option
                  v-for="item in areaList"
                  :key="item.phoneCode"
                  :value="item.phoneCode"
                  :label="`+${item.phoneCode} ${current == 'zh' ? item.chineseName : item.englishName}`"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="type">
              <template #label>证件类型</template>
              <el-select
                v-model="formData.type"
                placeholder="請選擇"
                style="width: 100%"
                @change="handleTypeChange"
              >
                <el-option
                  v-for="item in certificate"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="userName">
              <template #label>姓名</template>
              <el-input
                v-model="formData.userName"
                placeholder="请输入姓名"
                style="width: 100%"
              ></el-input>
            </el-form-item>
            <el-form-item prop="number">
              <template #label>身份证号</template>
              <el-input
                v-model="formData.number"
                :placeholder="`请输入${formData.title || '身份证号'}`"
                style="width: 100%"
              ></el-input>
            </el-form-item>
            <div class="remark" style="padding-top: 10px; font-size: 0.32rem; font-weight: 400">
              拍攝您的政府發行的身份證的正反面照片
            </div>
            <el-form-item prop="fileList">
              <template #label>身份证/驾驶证正面</template>
              <el-upload
                style="margin-top: 10px; position: relative"
                :http-request="customUpload"
                :before-upload="beforeUpload"
                :limit="1"
                :file-list="formData.fileList"
                accept="image/*"
                :show-file-list="false"
              >
                <div v-if="!formData.fileList.length">
                  <img
                    style="width: 100%; height: 162px"
                    src="@/assets/image/w-Upload-Frontal.svg"
                    alt=""
                  />
                  <p class="Tips">点击上传证件照正面</p>
                </div>
                <div v-else style="position: relative">
                  <i
                    style="
                      position: absolute;
                      top: 0;
                      right: 0;
                      cursor: pointer;
                      font-size: 0.267rem;
                    "
                    @click.stop="removeImg"
                    class="el-icon-error remove_img"
                  ></i>
                  <img style="width: 100%; height: 162px" :src="formData.fileList[0].url" alt="" />
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item prop="fileList2">
              <template #label>身份证/驾驶证背面</template>
              <el-upload
                style="margin-top: 10px; position: relative"
                :http-request="customUpload2"
                :before-upload="beforeUpload"
                :limit="1"
                :file-list="formData.fileList2"
                accept="image/*"
                :show-file-list="false"
              >
                <div v-if="!formData.fileList2.length">
                  <img
                    style="width: 100%; height: 162px"
                    src="@/assets/image/w-Upload-the-reverse-side.svg"
                    alt=""
                  />
                  <p class="Tips">点击上传证件照反面</p>
                </div>
                <div v-else style="position: relative">
                  <i
                    style="position: absolute; top: 0; right: 0; cursor: pointer; font-size: 20px"
                    @click.stop="removeImg2"
                    class="el-icon-error remove_img"
                  ></i>
                  <img style="width: 100%; height: 162px" :src="formData.fileList2[0].url" alt="" />
                </div>
              </el-upload>
            </el-form-item>
            <p class="Kind-tips">1.图片大小必须小于2M</p>
            <p class="Kind-tips">2.认证通过后资料不可修改，平台会保护您的个人资讯</p>
          </el-form>
        </div>

        <div span="24" style="margin-top: 10px">
          <button
            @click="submit"
            type="button"
            class="el-button next-btn ai-version-but el-button--primary el-button--medium"
          >
            <span>提交</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './index.css';

.Kind-tips {
  font-size: 12px;
  padding: 5px 0;
  font-weight: 700;
  color: #919191;
}

.userauth {
  background-color: #ffffff;
  min-height: calc(100vh - 50px);
}

:deep(.el-form-item__content) {
  margin-left: 0 !important;
  position: relative;
  display: block;
}

:deep(.el-select__wrapper, .el-input__wrapper) {
  border: 0.013rem solid #94959b;
  height: 100%;
  box-shadow: none !important;
  border-radius: 0.187rem;
}

:deep(.el-input__wrapper) {
  border: 0.013rem solid #94959b;
  height: 100%;
  box-shadow: none !important;
  border-radius: 0.187rem;
}

:deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
  box-shadow: none;
}

:deep(.el-form-item) {
  margin-bottom: 35px;
}
</style>

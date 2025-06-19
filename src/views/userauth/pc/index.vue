<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container">
    <div>
      <div class="identity-container">
        <div class="content">
          <div class="title"><h6>KYC認證</h6></div>
          <div class="state">
            <div class="title" style="font-weight: 400">个人资讯</div>
            <el-form :model="formData" :rules="rules" ref="formRef">
              <el-form-item prop="action">
                <div class="input-box">
                  <span class="input-title">居住國家/地區</span>
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
                </div>
              </el-form-item>
              <el-form-item prop="type">
                <div class="input-box">
                  <span class="input-title">证件类型</span>
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
                </div>
              </el-form-item>
              <el-form-item prop="userName">
                <div class="input-box">
                  <span class="input-title">姓名</span>
                  <el-input
                    v-model="formData.userName"
                    placeholder="请输入姓名"
                    style="width: 100%"
                  ></el-input>
                </div>
              </el-form-item>
              <el-form-item prop="number">
                <div class="input-box">
                  <span class="input-title">{{ formData.title || '身份证号' }}</span>
                  <el-input
                    v-model="formData.number"
                    :placeholder="`请输入${formData.title || '身份证号'}`"
                    style="width: 100%"
                  ></el-input>
                </div>
              </el-form-item>
              <div class="identity">
                <div class="title title-remark">
                  <div class="remark" style="font-weight: 400">上传证件照片</div>
                </div>
                <div class="kyc-standard">
                  <ul>
                    <li>
                      <img src="@/assets/image/kyc1.png" alt="" />

                      <p>标准</p>
                    </li>
                    <li>
                      <img src="@/assets/image/kyc2.png" alt="" />
                      <p>不缺边</p>
                    </li>
                    <li>
                      <img src="@/assets/image/kyc3.png" alt="" />
                      <p>不模湖</p>
                    </li>
                    <li>
                      <img src="@/assets/image/kyc4.png" alt="" />

                      <p>不反光</p>
                    </li>
                  </ul>
                </div>
                <div class="upload" style="display: flex; justify-content: space-between">
                  <el-form-item prop="fileList">
                    <p class="item-title" style="font-size: 0.213rem; font-weight: 700">
                      身份证/驾驶证正面
                    </p>
                    <div class="identity-upload">
                      <div class="front">
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
                            <img
                              style="width: 100%; height: 162px"
                              :src="formData.fileList[0].url"
                              alt=""
                            />
                          </div>
                        </el-upload>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item prop="fileList2">
                    <p class="item-title" style="font-size: 0.213rem; font-weight: 700">
                      身份证/驾驶证背面
                    </p>
                    <div class="identity-upload">
                      <div class="reverse">
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
                              style="
                                position: absolute;
                                top: 0;
                                right: 0;
                                cursor: pointer;
                                font-size: 0.267rem;
                              "
                              @click.stop="removeImg2"
                              class="el-icon-error remove_img"
                            ></i>
                            <img
                              style="width: 100%; height: 162px"
                              :src="formData.fileList2[0].url"
                              alt=""
                            />
                          </div>
                        </el-upload>
                      </div>
                    </div>
                  </el-form-item>
                </div>
                <p class="Kind-tips">1.图片大小必须小于2M</p>
                <p class="Kind-tips">2.认证通过后资料不可修改，平台会保护您的个人资讯</p>
              </div>
              <div class="back-next el-col el-col-24">
                <button
                  @click="submit"
                  type="button"
                  class="el-button next-btn el-button--primary el-button--medium"
                >
                  <span>提交</span>
                </button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { storageDict } from '@/config/dict'
import { uploadImg } from '@/api/common/index.js'
import { ElNotification } from 'element-plus'
import { uploadKYC, getAreaCode } from '@/api/user'

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
<style lang="scss" scoped>
@import './index.css';

:deep(.el-form-item__content) {
  margin-left: 0 !important;
  position: relative;
  display: block;
}

:deep(.el-select__wrapper, .el-input__wrapper) {
  border: none;
  height: 100%;
  box-shadow: none !important;
}

:deep(.el-input__wrapper) {
  border: none;
  height: 100%;
  box-shadow: none !important;
}

:deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
  box-shadow: none;
}

:deep(.el-form-item) {
  margin-bottom: 35px;
}
</style>

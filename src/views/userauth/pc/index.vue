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
                      <img
                        src="data:image/png;base64,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"
                        alt=""
                      />
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
                      <img
                        src="data:image/png;base64,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"
                        alt=""
                      />
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

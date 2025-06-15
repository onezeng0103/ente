<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container" v-checkLoading="checkLoading">
    <div class="outer-layer-container">
      <div class="accountBinding">
        <div class="email inputColor">
          <h6 class="el-icon-back" @click="router.back()"></h6>
          <div class="box-left both-sides">
            <img src="@/assets/image/1(3).png" alt="" />
            <img src="@/assets/image/image154.png" alt="" />
          </div>
          <div class="email-box">
            <h6 class="email-title">手机号绑定</h6>
            <div>
              <el-form
                :rules="rules"
                :hide-required-asterisk="true"
                label-width="auto"
                size="large"
                label-position="top"
                :model="formData"
                ref="formRef"
              >
                <el-form-item label="手机号" prop="phone">
                  <div style="display: flex; align-items: center; width: 100%">
                    <el-select
                      filterable
                      v-model="formData.phoneCode"
                      placeholder="请选择国家/地区"
                      style="width: 120px"
                    >
                      <el-option
                        v-for="item in areaList"
                        :key="item.phoneCode"
                        :value="item.phoneCode"
                        :label="`+${item.phoneCode} ${current == 'zh' ? item.chineseName : item.englishName}`"
                      />
                    </el-select>
                    <el-input
                      v-model.trim="formData.phone"
                      placeholder="请输入手机号"
                      style="flex: 1; margin-left: 10px"
                    />
                  </div>
                </el-form-item>
                <div class="code_box">
                  <el-form-item label="验证码" prop="code">
                    <el-input v-model="formData.code" placeholder="请输入验证码" />
                  </el-form-item>
                  <button
                    v-if="flag"
                    type="button"
                    class="el-button ai-version-but el-button--primary el-button--medium"
                  >
                    <span>
                      <van-count-down :time="time" format="ss" @finish="finish" />
                    </span>
                  </button>
                  <button
                    v-else
                    @click="send"
                    type="button"
                    class="el-button ai-version-but el-button--primary el-button--medium"
                  >
                    <span>发送验证码</span>
                  </button>
                </div>
                <el-form-item>
                  <button
                    @click="submit"
                    type="button"
                    class="el-button ai-version-but el-button--primary el-button--medium"
                  >
                    <span>确认</span>
                  </button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="box-right both-sides">
            <img src="@/assets/image/Rectangle504677.png" alt="" />
            <img src="@/assets/image/1(3).png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { mobileCode, mobileBind, getAreaCode } from '@/api/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { storageDict } from '@/config/dict'
const current = ref(localStorage.getItem(storageDict.LANGUAGE))
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
const formData = ref({
  phoneCode: '86',
  phone: '',
  code: ''
})
const rules = ref({
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})
const checkLoading = ref(false)
const formRef = useTemplateRef('formRef')
const time = ref(0)
const flag = ref(false)
const send = () => {
  checkLoading.value = true
  mobileCode('BIND', formData.value.phoneCode + formData.value.phone).then((res) => {
    checkLoading.value = false
    if (res.code == '200') {
      flag.value = true
      time.value = 60 * 1000
      ElNotification({
        title: res.msg,
        type: 'success'
      })
    } else {
      ElNotification({
        title: res.msg,
        type: 'error'
      })
    }
  })
}
// 倒计时结束
const finish = () => {
  flag.value = false
}
const submit = async () => {
  await formRef.value.validate((valid) => {
    if (valid) {
      mobileBind(formData.value.phoneCode + formData.value.phone, formData.value.code).then(
        (res) => {
          if (res.code == '200') {
            ElNotification({
              title: '绑定成功',
              type: 'success'
            })
          } else {
            ElNotification({
              title: res.msg,
              type: 'error'
            })
          }
        }
      )
    }
  })
}
onMounted(() => {
  codeList()
})
</script>
<style lang="scss" scoped>
@import './index.css';
:deep(.el-form-item) {
  display: flex;
  flex-direction: column;
  margin-bottom: 22px !important;
}
:deep(.el-form-item__label) {
  color: #fff;
  line-height: 0.48rem;
  white-space: nowrap;
  vertical-align: middle;
  float: left;
  font-size: 0.187rem;
  padding: 0 0.16rem 0 0;
  box-sizing: border-box;
}
:deep(.el-input__inner) {
  color: #fff;
}
:deep(.el-input__wrapper) {
  height: 0.64rem;
  background: #292929;
  border-radius: 0.107rem;
  box-shadow: 0 0 0 1px #dbdbdb;
  color: #fff;
}
:deep(.el-select__wrapper, .is-focus) {
  height: 0.64rem;
  background-color: transparent;
  border-radius: 0.107rem;
  color: #fff;
  box-shadow: 0 0 0 1px #dbdbdb;
}
:deep(.el-select__wrapper) {
  height: 0.64rem;
  background-color: transparent;
  border-radius: 0.107rem;
  color: #fff;
  box-shadow: 0 0 0 1px #dbdbdb;
}
:deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
  box-shadow: 0 0 0 1px #dbdbdb;
}
</style>

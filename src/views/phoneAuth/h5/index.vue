<script setup>
import { mobileCode, mobileBind, getAreaCode } from '@/api/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { storageDict } from '@/config/dict'
import navigation from '@/component/h5/navigation/index.vue'

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

<template>
  <navigation title="手机号绑定"></navigation>

  <div class="email" style="display: block; height: calc(100vh - 50px)">
    <template v-if="bind">
      <div class="step">
        <div class="email-box">
          <img src="@/assets/image/sec-phone.svg" alt="" />
          <p>電話號碼驗證為您的提款和帳戶增加了另一層安全保障</p>
        </div>
        <ul class="email-list">
          <li>
            <span>电话号码</span>
            <button class="to-bind">已綁定</button>
          </li>
          <li>
            <span>更改电话号码</span>
            <span><i class="el-icon-arrow-right" @click="bind = false"></i></span>
          </li>
        </ul>
      </div>
    </template>
    <template v-else>

      <div style="padding: 20px 10px">
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
              <template #label>
                <div style="width: 100% !important; text-align: left; font-size: 14px; color: #000">
                  手机号
                </div>
              </template>
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
                <template #label>
                  <div
                    style="width: 100% !important; text-align: left; font-size: 14px; color: #000"
                  >
                    验证码
                  </div>
                </template>

                <div
                  style="
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  "
                >
                  <div class="el-input el-input--large" style="flex: 1 1 0">
                    <div class="el-input__wrapper">
                      <input
                        class="el-input__inner"
                        style="color: #000000"
                        v-model="formData.code"
                        type="text"
                        placeholder="请输入验证码"
                      />
                    </div>
                  </div>
                  <template v-if="flag">
                    <div
                      class="el-button"
                      style="
                        width: 90px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-left: 10px;
                        background-color: rgb(0, 0, 0);
                        color: rgb(255, 255, 255);
                        border: none;
                        font-size: 12px;
                      "
                    >
                      <span>
                        <van-count-down
                          :time="time"
                          format="ss"
                          @finish="finish"
                          style="color: #ffffff"
                        />
                      </span>
                    </div>
                  </template>
                  <template v-else>
                    <div
                      @click="send"
                      class="el-button"
                      style="
                        width: auto;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-left: 10px;
                        background-color: rgb(0, 0, 0);
                        color: rgb(255, 255, 255);
                        border: none;
                        font-size: 12px;
                      "
                    >
                      <span>发送验证码</span>
                    </div>
                  </template>
                </div>
              </el-form-item>
            </div>
            <el-form-item>
              <div
                @click="submit"
                style="
                  color: #fff;
                  width: 100%;
                  height: 1.093rem;
                  border-radius: 0.667rem;
                  font-size: 0.48rem;
                  font-weight: 400;
                  background: #000;
                  border: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-top: 30px;
                "
              >
                确定
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
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
}

:deep(.el-input__wrapper) {
  //height: 0.64rem;
  //background: #292929;
  border-radius: 0.107rem;
  box-shadow: 0 0 0 1px #dbdbdb;
}

:deep(.el-select__wrapper, .is-focus) {
  //height: 0.64rem;
  background-color: transparent;
  border-radius: 0.107rem;
  box-shadow: 0 0 0 1px #dbdbdb;
}

:deep(.el-select__wrapper) {
  //height: 0.64rem;
  background-color: transparent;
  border-radius: 0.107rem;
  color: #fff;
  box-shadow: 0 0 0 1px #dbdbdb;
}

:deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
  box-shadow: 0 0 0 1px #dbdbdb;
}
</style>

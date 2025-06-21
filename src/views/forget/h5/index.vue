<script setup>
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { emailCode } from '@/api/user'
import navigation from '@/component/h5/navigation/index.vue'

const router = useRouter()
const formRef = useTemplateRef('formRef')
const form = ref({
  email: '',
  code: ''
})
const flag = ref(false)
const time = ref(0)
const rules = ref({
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})
const send = () => {
  if (!form.value.email) {
    ElNotification({
      title: '请输入邮箱',
      type: 'error'
    })
    return
  }
  emailCode('FIND_PASSWORD', form.value.email).then((res) => {
    if (res.code === 500) {
      ElNotification({
        title: res.msg,
        type: 'error'
      })
    } else {
      ElNotification({
        title: res.msg,
        type: 'success'
      })
      time.value = 300 * 1000
      flag.value = true
    }
  })
}
const submit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    router.push('/setpwd?email=' + email.value + '&code=' + code.value)
  })
}
</script>

<template>
  <navigation title="忘记密码"></navigation>

  <div class="email" style="display: block; height: calc(100vh - 50px)">
    <div style="padding: 20px 10px">
      <div style="display: flex;justify-content: center;margin-bottom: 20px">
        <img src="@/assets/image/changePasswordH5.png" alt="">
      </div>
      <div>
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          :hide-required-asterisk="true"
          label-width="auto"
          size="large"
          label-position="top"
        >
          <el-form-item label="邮箱" prop="phone">
            <template #label>
              <div style="width: 100% !important; text-align: left; font-size: 14px; color: #000">
                邮箱
              </div>
            </template>
            <el-input style="width: 100%" v-model="form.email" placeholder="请输入邮箱" />
          </el-form-item>
          <div class="code_box">
            <el-form-item label="验证码" prop="code">
              <template #label>
                <div style="width: 100% !important; text-align: left; font-size: 14px; color: #000">
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
                <el-input v-model="form.code" placeholder="请输入验证码" />
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
                        @finish="flag = false"
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

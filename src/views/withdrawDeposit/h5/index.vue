<script setup>
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { updateUserWithdrawAddress } from '@/api/account'
import { useUserStore } from '@/store/user/index'
import { useMainStore } from '@/store/index'
import { filterCoin2 } from '@/utils/public.js'
import { TronWeb } from 'tronweb'
import navigation from '@/component/h5/navigation/index.vue'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const router = useRouter()
const formRef = useTemplateRef('formRef')
const mainStore = useMainStore()
const coinList = computed(() => {
  let list = []
  mainStore.getWithdrawList.forEach((item, index) => {
    // status:0关闭，1开启
    if (item.status == '1') {
      let obj = {}
      obj['type'] = 1 //提现
      obj['ratio'] = item.ratio || '' //手续费
      obj['fee'] = item.fee //固定手续费
      // type:0数据货币，1银行卡
      if (item.type == 0) {
        obj['icon'] = item.rechargeType
        obj['title'] = item.rechargeName
      } else {
        obj['icon'] = 'card'
        // 银行卡提现
        obj['title'] = '银行卡提现'
        obj['card'] = filterCoin2(item.rechargeType).toLocaleUpperCase()
      }

      list.push(obj)
    }
  })
  return list
})
const form = ref({
  title: '',
  address: ''
})
const validateAddress = (rule, value, callback) => {
  console.log(11111)
  if (!TronWeb.isAddress(value)) {
    callback(new Error('请输入有效的地址'))
  } else {
    callback()
  }
}
const rules = ref({
  title: [{ required: true, message: '请选择币种类型', trigger: 'blur' }],
  address: [
    { required: true, message: '请输入提现地址', trigger: 'blur' },
    { validator: validateAddress, trigger: 'blur' }
  ]
})
const submit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    updateUserWithdrawAddress({
      address: form.value.address,
      type: form.value.type
    }).then((res) => {
      if (res.code == '200') {
        ElNotification({
          title: '设置成功',
          type: 'success'
        })
        router.push('/')
      } else {
        ElNotification({
          title: res.msg,
          type: 'error'
        })
      }
    })
  })
}
</script>

<template>
  <navigation title="绑定提币地址"></navigation>

  <div class="email" style="display: block; height: calc(100vh - 50px)">
    <div style="padding: 20px 10px">
      <div
        style="
          width: 100% !important;
          text-align: left;
          font-size: 14px;
          color: #000;
          font-weight: 700;
          margin-bottom: 10px;
        "
      >
        用户名:{{ userInfo?.user?.loginName }}
      </div>
      <div>
        <el-form
          :rules="rules"
          :hide-required-asterisk="true"
          size="large"
          label-position="top"
          :model="form"
          ref="formRef"
        >
          <el-form-item label="币种类型" prop="title">
            <template #label>
              <div style="width: 100% !important; text-align: left; font-size: 14px; color: #000">
                币种类型
              </div>
            </template>
            <div style="display: flex; align-items: center; width: 100%">
              <el-select v-model="form.title" placeholder="请选择币种类型">
                <el-option
                  v-for="item in coinList"
                  :key="item.title"
                  :label="item.title"
                  :value="item.title"
                />
              </el-select>
            </div>
          </el-form-item>
          <div class="code_box">
            <el-form-item label="提现地址" prop="address">
              <template #label>
                <div style="width: 100% !important; text-align: left; font-size: 14px; color: #000">
                  提现地址
                </div>
              </template>
              <el-input v-model="form.address" placeholder="请输入提现地址"/>
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

<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container">
    <div class="outer-layer-container">
      <div class="tradingPassword-box">
        <h6 class="el-icon-back" @click="router.back()"></h6>
        <div class="box-left both-sides">
          <img src="@/assets/image/image154(1).png" alt="" />
        </div>
        <div class="pwd-content">
          <div class="reset_box">
            <h2>设置提现地址</h2>
            <p style="margin-bottom: 7px">
              <span>用戶名 {{ userInfo?.user?.loginName }}</span>
            </p>
            <el-form ref="formRef" :model="form" :rules="rules">
              <el-form-item prop="title">
                <el-select v-model="form.title" placeholder="请选择币种类型">
                  <el-option
                    v-for="item in coinList"
                    :key="item.title"
                    :label="item.title"
                    :value="item.title"
                  />
                </el-select>
              </el-form-item>
              <el-form-item prop="address">
                <el-input v-model="form.address" placeholder="请输入提现地址" />
              </el-form-item>
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
          <img src="@/assets/image/Rectangle504677(1).png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { updateUserWithdrawAddress } from '@/api/account'
import { useUserStore } from '@/store/user/index'
import { useMainStore } from '@/store/index'
import { filterCoin2 } from '@/utils/public.js'
import { TronWeb } from 'tronweb'
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
<style lang="scss" scoped>
@import './index.css';
:deep(.el-form-item) {
  margin-bottom: 30px !important;
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
:deep(.el-select__wrapper) {
  height: 0.64rem;
  background: #292929;
  border-radius: 0.107rem;
  box-shadow: 0 0 0 1px #dbdbdb;
}
</style>

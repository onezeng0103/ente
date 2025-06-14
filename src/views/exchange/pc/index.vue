<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container">
    <div class="outer-layer-container">
      <div class="transfer">
        <div class="h-transfer">
          <div>
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
          <div class="c-transfer-title">
            <p>
              <i class="iconfont icon-huazhuan"></i>
              划转
            </p>
            <p>便利、安全地在不同帐户间转移资金，提升资金管理效率。</p>
          </div>
          <div>
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
        </div>
        <div class="c-transfer">
          <div class="l-transferbox">
            <p class="form-title">币种</p>
            <div class="select-icon">
              <div class="el-select el-select--medium">
                <div class="el-input el-input--medium el-input--prefix el-input--suffix">
                  <input
                    type="text"
                    readonly
                    autocomplete="off"
                    value="USDT"
                    class="el-input__inner"
                  />
                  <span class="el-input__prefix">
                    <span class="symbol">
                      <span>
                        <svg
                          fill="none"
                          height="32"
                          viewBox="0 0 32 32"
                          width="32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m32 16c0 8.8366-7.1634 16-16 16-8.83656 0-16-7.1634-16-16 0-8.83656 7.16344-16 16-16 8.8366 0 16 7.16344 16 16z"
                            fill="#009393"
                          ></path>
                          <path
                            clip-rule="evenodd"
                            d="m9.79135 8h12.67175c.3024 0 .5817.16175.7325.42416l3.6918 6.42464c.1914.3332.1346.7537-.1385 1.0239l-10.1618 10.0537c-.3292.3257-.8587.3257-1.1879 0l-10.14808-10.0402c-.27943-.2764-.33175-.7092-.12627-1.0445l3.94625-6.43815c.15369-.25074.42641-.40355.72025-.40355zm11.03565 2.8684v1.8026h-3.6097v1.2499c2.5352.1335 4.4373.6821 4.4514 1.3396l-.0001 1.3707c-.0141.6575-1.9161 1.2061-4.4513 1.3396v3.0673h-2.3969v-3.0673c-2.5352-.1335-4.4373-.6821-4.4514-1.3396l.0001-1.3707c.0141-.6575 1.9161-1.2061 4.4513-1.3396v-1.2499h-3.6097v-1.8026zm-4.8081 6.1608c2.7054 0 4.9668-.4639 5.5202-1.0833-.4693-.5253-2.1668-.9388-4.3218-1.0523v1.3086c-.3862.0203-.7872.0311-1.1984.0311-.4113 0-.8122-.0108-1.1985-.0311v-1.3086c-2.155.1135-3.8525.527-4.3218 1.0523.5534.6194 2.8147 1.0833 5.5203 1.0833z"
                            fill="#fff"
                            fill-rule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </span>
                  </span>
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner">
                      <i class="el-select__caret el-input__icon el-icon-arrow-up"></i>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="Account-box">
              <div class="t-Account">
                <span>划转方向</span>
                <span>转至</span>
              </div>
              <div class="b-Account">
                <div class="l-Account">
                  <el-select
                    v-model="params.transferOutAccount"
                    @visible-change="handleShowBottom(true)"
                    @change="handleSelect"
                  >
                    <el-option
                      v-for="(item, index) in transferOutAccountList"
                      :key="index"
                      :label="item.keyStr"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <div class="c-Account" @click="jiaohuanbtn">
                  <i class="iconfont icon-jiaoyi"></i>
                </div>
                <div class="r-Account">
                  <el-select
                    v-model="params.transferInAccount"
                    @visible-change="handleShowBottom(false)"
                    @change="handleSelect"
                  >
                    <el-option
                      v-for="(item, index) in transferInAccountList"
                      :key="index"
                      :label="item.keyStr"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <p class="form-title">数量</p>
            <el-form :model="params" :rules="rules" ref="ruleFormRef">
              <el-form-item prop="amount">
                <el-input type="number" v-model="params.amount" placeholder="请输入划转金额">
                  <template #suffix>
                    <span
                      @click="amountAll"
                      style="
                        font-weight: 700;
                        color: #000;
                        margin-right: 0.107rem;
                        line-height: 0.6rem;
                        cursor: pointer;
                      "
                    >
                      全部
                    </span>
                  </template>
                </el-input>
              </el-form-item>
              <p class="form-money">
                <span>可用:</span>
                {{ availableAmount }} USDT
              </p>
              <el-form-item>
                <button
                  @click="handleConfirm"
                  type="button"
                  class="el-button submit ai-version-but el-button--default el-button--medium"
                >
                  <span>确认</span>
                </button>
              </el-form-item>
            </el-form>
          </div>
          <div class="r-img"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMainStore } from '@/store'
import { getUserBalance, getTransferList } from '@/api/account'
import { ElNotification } from 'element-plus'
const mainStore = useMainStore()
const ruleFormRef = useTemplateRef('ruleFormRef')
const params = ref({
  coin: 'usdt',
  transferOutAccount: '',
  transferInAccount: '',
  amount: ''
})
const rules = ref({
  amount: [{ required: true, message: '请输入划转金额', trigger: 'blur' }]
})
// 选择器数据
const tempList = computed(() => {
  const list = mainStore.getAssetsTabList.filter((item) => {
    const key = { 平台资产: 1, 理财资产: 2, 合约资产: 3 }
    if (!item.isOpen) return false
    item.name == '平台资产' && (item.keyStr = '平台资产')
    item.name == '理财资产' && (item.keyStr = '理财资产')
    item.name == '合约资产' && (item.keyStr = '合约资产')
    item['text'] = item.keyStr
    item['value'] = key[item.name]
    return true
  })
  return list.sort((a, b) => a.sort - b.sort)
})
//默认值
params.value.transferOutAccount = tempList.value[0]?.value || ''
params.value.transferInAccount = tempList.value[1]?.value || ''
const transferOutAccountList = computed(() =>
  tempList.value.filter((item) => item.value != params.value.transferInAccount)
)

const transferInAccountList = computed(() =>
  tempList.value.filter((item) => item.value != params.value.transferOutAccount)
)
const isType = ref(false)
const handleShowBottom = (value) => {
  isType.value = value
}
const handleSelect = (value) => {
  if (isType.value) {
    params.value.transferOutAccount = value
  } else {
    params.value.transferInAccount = value
  }
}
const jiaohuanbtn = () => {
  ;[params.value.transferOutAccount, params.value.transferInAccount] = [
    params.value.transferInAccount,
    params.value.transferOutAccount
  ]
}
//获取余额
const availableList = ref([])
const getBalance = async () => {
  let res = await getUserBalance()
  if (res.code == '200') {
    availableList.value = res.data
  }
}
// 计算余额   -->1 平台资产 2理财资产 3合约账户
const availableAmount = computed(() => {
  let amountTemp = ''
  availableList.value.forEach((item, index) => {
    if (item?.type == params.value.transferOutAccount) {
      amountTemp = item.availableAmount
    }
  })

  return amountTemp
})
const amountAll = () => {
  console.log(availableAmount.value)
  params.value.amount = availableAmount.value
}
const handleConfirm = async () => {
  await ruleFormRef.value.validate((valid) => {
    if (valid) {
      getTransferList(params.value).then((res) => {
        if (res.code == '200') {
          ElNotification({
            title: '操作成功',
            type: 'success'
          })
          params.value.amount = ''
          getBalance()
        } else {
          ElNotification({
            title: res.msg,
            type: 'error'
          })
        }
      })
    }
  })
}
onMounted(() => {
  getBalance()
})
</script>
<style lang="scss" scoped>
@import './index.css';
:deep(.el-select__wrapper) {
  height: 0.6rem;
  border: 0;
  box-shadow: none;
  background-color: #fafafa;
  border-radius: calc(infinity * 0.013rem);
}
:deep(.el-input__wrapper) {
  height: 0.6rem;
  border: 0;
  box-shadow: none;
  background-color: #fafafa;
  border-radius: calc(infinity * 0.013rem);
}
</style>

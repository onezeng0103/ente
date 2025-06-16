<script setup>
import navigation from '@/component/h5/navigation/index.vue'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n'
import { useMainStore } from '@/store'
import { getUserBalance, getTransferList } from '@/api/account'
import router from '@/router/index.js'

const { t } = useI18n()
const mainStore = useMainStore()
const params = ref({
  coin: 'usdt',
  transferOutAccount: '',
  transferInAccount: '',
  amount: ''
})
// 选择器数据
const tempList = computed(() => {
  const list = mainStore.getAssetsTabList.filter((item) => {
    // 对应参数key值 -->1 平台资产 2理财资产 3合约账户
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
const returnName = (value) => {
  const list = mainStore.getAssetsTabList.filter((item) => {
    if (item.value == value) {
      return true
    }
  })
  return list[0]?.keyStr
}
const list = ref([])
const isType = ref(false)
const showBottom = ref(false)
const handleShowBottom = (value) => {
  isType.value = value
  if (value) {
    list.value = transferOutAccountList.value
  } else {
    list.value = transferInAccountList.value
  }
  showBottom.value = true
}
const handleSelect = (item) => {
  if (isType.value) {
    params.value.transferOutAccount = item.value
  } else {
    params.value.transferInAccount = item.value
  }
  showBottom.value = false
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
const handleConfirm = () => {
  if (!params.value.amount) {
    showToast('请输入划转金额')
    return
  }
  getTransferList(params.value).then((res) => {
    if (res.code == '200') {
      showToast('操作成功请稍后...')
      params.value.amount = ''
      getBalance()
    } else {
      showToast(res.msg || '')
    }
  })
}
onMounted(() => {
  getBalance()
})
</script>

<template>
  <div style="background-color: #fafafa; width: 100vw; height: 100vh; padding: 0 20px">
    <navigation title="划转"></navigation>
    <div class="transfer-box" style="background-color: #ffffff; margin-top: 20px">
      <div class="transfer-content">
        <p class="transfer-title"><span>劃轉方向</span></p>
        <div class="form-item-div" @click="handleShowBottom(true)">
          <div class="l-item-div">
            <span class="coin-name">{{ returnName(params.transferOutAccount) }}</span>
          </div>
          <i class="el-icon-caret-right"></i>
        </div>
        <p class="transfer-title">
          <span>轉至</span>
          <i class="iconfont icon-jiaoyi" @click="jiaohuanbtn"></i>
        </p>
        <div class="form-item-div" @click="handleShowBottom(false)">
          <div class="l-item-div">
            <span class="coin-name">{{ returnName(params.transferInAccount) }}</span>
          </div>
          <i class="el-icon-caret-right"></i>
        </div>
        <p class="transfer-title"><span>交易幣種</span></p>
        <div class="form-item-div">
          <div class="l-item-div">
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
            <span class="coin-name">USDT</span>
          </div>
          <i class="el-icon-caret-right"></i>
        </div>
      </div>
      <form class="el-form el-form--label-top">
        <p class="transfer-title"><span>交易金額</span></p>
        <div class="el-form-item is-required el-form-item--medium">
          <div class="el-form-item__content">
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
          </div>
        </div>
        <h6 class="money">
          <span>數量 : {{ availableAmount }}可用</span>
        </h6>
        <div class="el-form-item confirm el-form-item--medium">
          <div class="el-form-item__content">
            <button
              type="button"
              class="el-button ai-version-but el-button--default el-button--medium"
              @click="handleConfirm"
            >
              <span>確認</span>
            </button>
          </div>
        </div>
      </form>
      <div class="deposit">
        <span class="Insufficient-balance">餘額不足?</span>
        <span class="recharge" @click="router.push('/recharge')">充幣</span>
      </div>
    </div>

    <div
      @click="showBottom = false"
      v-if="showBottom"
      class="van-overlay"
      style="z-index: 2001"
    ></div>
    <div
      class="van-popup van-popup--round van-popup--bottom"
      style="
        height: 45%;
        z-index: 2002;
        transition: all 0.3s ease;
        align-items: normal;
        padding: 0 10px;
      "
      :style="{ bottom: showBottom ? '0' : '-100%' }"
    >
      <div>
        <h5
          style="
            line-height: 0.8rem;
            font-size: 0.373rem;
            font-weight: 400;
            padding: 10px 0.133rem;
            color: var(--mobilefont);
            border-bottom: 0.013rem solid #eee;
          "
        >
          请选择划入账户
        </h5>
        <div @click="showBottom = false">
          <i
            role="button"
            tabindex="0"
            class="van-icon van-icon-cross van-popup__close-icon van-popup__close-icon--top-right"
          ></i>
        </div>
      </div>
      <div class="network-list">
        <div
          class="network-list-item"
          @click="handleSelect(item)"
          v-for="(item, index) in list"
          :key="index"
        >
          <div>{{ item.keyStr }}</div>
          <div
            v-if="
              item.value === params.transferInAccount || item.value === params.transferOutAccount
            "
            class="van-radio__icon van-radio__icon--square van-radio__icon--checked"
          >
            <i
              class="van-icon van-icon-success"
              style="border-color: rgb(0, 0, 0); background-color: rgb(0, 0, 0)"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './index.css';

.network-list-item {
  width: 100%;
  margin: 0.267rem 0;
  background: #fafafa;
  border-radius: 0.4rem;
  border: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0.267rem;
  font-size: 14px;
}

:deep(.el-input__wrapper, .el-input__inner, .el-input__inner:focus, .is-focus) {
  height: 1.067rem;
  border: 0;
  background-color: #f4f6f8;
  border-radius: calc(infinity * 0.013rem);
  font-style: normal;
  font-weight: 400;
  color: #000000;
  box-shadow: 0 0 0 1px #ffffff;
}
</style>

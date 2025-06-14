<template>
  <div class="h-50px" style="height: 50px"></div>
  <div class="router-container">
    <div class="Wallet">
      <div class="withdraw">
        <div class="isBankcard">
          <section class="withdraw-section">
            <p class="DigitalCurrencyWithdrawa">数字货币提现</p>
            <el-form
              :model="form"
              size="large"
              :rules="rules"
              :hide-required-asterisk="true"
              ref="formRef"
              label-position="top"
            >
              <ul class="withdraw-box">
                <li>
                  <h6 class="balance">可用 {{ amount }} {{ info?.icon?.toUpperCase() }}</h6>
                </li>
                <li class="withdraw-currency">
                  <el-form-item label="币种" prop="coinType">
                    <el-select v-model="form.coinType" placeholder="请选择" @change="handleChange">
                      <el-option
                        v-for="item in list"
                        :value="item.title"
                        :label="item.title"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li class="withdraw-address">
                  <el-form-item label="地址" prop="address">
                    <el-select v-model="form.address" placeholder="请选择">
                      <el-option
                        v-for="item in addressList"
                        :value="item.address"
                        :label="item.address"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li class="withdraw-input">
                  <el-form-item label="提现数量" prop="allAmount">
                    <el-input
                      v-model="form.allAmount"
                      placeholder="请输入提款金额"
                      @keypress="onKeyPress"
                    >
                      <template #suffix>
                        <span
                          style="color: #fff; cursor: pointer; margin-right: 10px"
                          @click="allNum"
                        >
                          全部
                        </span>
                      </template>
                    </el-input>
                  </el-form-item>
                </li>
                <li class="withdraw-network">
                  <el-form-item label="提现密码" prop="password">
                    <el-input
                      type="password"
                      show-password
                      v-model="form.password"
                      placeholder="请输入提现密码"
                    ></el-input>
                  </el-form-item>
                </li>
                <li class="submit mt-1">
                  <el-form-item>
                    <button
                      @click="submit"
                      type="button"
                      class="el-button ai-version-but el-button--submit el-button--medium"
                    >
                      <span>提现</span>
                    </button>
                  </el-form-item>
                </li>
              </ul>
            </el-form>
          </section>
          <div class="common-problem">
            <h6>常见问题</h6>
            <div class="faq-c">
              <el-collapse accordion>
                <el-collapse-item title="为什么我的提币未到帐？" name="1">
                  <div>
                    当您汇出后，这笔资金已经在区块中，需区块进行确认，区块确认时间不固定。如区块确认后仍不到账，需联络对方平台进行核实。
                  </div>
                </el-collapse-item>
                <el-collapse-item title="什么是「网路位址」？" name="2">
                  <div>
                    加密货币地址是加密货币钱包的唯一字母和数字字串，可用于发送和接收加密货币。该位址指示钱包在区块链上的位置。
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div class="Withdrawal-method"></div>
          </div>
        </div>
        <div class="Withdrawals-record">
          <p class="Withdrawals-record-title">
            <span>近期提现记录</span>
            <span>查看历史记录</span>
          </p>
          <el-table
            :data="rowList"
            :border="false"
            :header-cell-style="{
              backgroundColor: '#212121',
              color: '#979797',
              fontSize: '0.187rem',
              fontWeight: '400',
              border: 'none'
            }"
          >
            <el-table-column label="交易类型">
              <template #default="scope">
                <span v-if="scope.row.orderType == null || scope.row.orderType == 1">充值成功</span>
                <span v-if="scope.row.orderType == 2">从华盛达账户划入</span>
              </template>
            </el-table-column>
            <el-table-column label="交易币种">
              <template #default="scope">
                <span>{{ scope?.row?.symbol?.toUpperCase() || scope?.row?.type }}</span>
              </template>
            </el-table-column>
            <el-table-column label="交易金额">
              <template #default="scope">
                <span>+{{ priceFormat(scope.row.amount) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="交易手续费">
              <template #default="scope">
                <span>{{ priceFormat(scope.row.thirdFee) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="交易日期">
              <template #default="scope">
                <span>{{ _timeFormat(scope.row.createTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template #default="scope">
                <span v-if="scope.row.status == 0">审核中</span>
                <span v-if="scope.row.status == 1">成功</span>
                <span v-if="scope.row.status == 2">失败</span>
              </template>
            </el-table-column>
            <template #empty>
              <div class="table-empty">
                <img
                  src="data:image/png;base64,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"
                  alt=""
                />
                <p>暂无资料</p>
              </div>
            </template>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useMainStore } from '@/store/index.js'
import { useUserStore } from '@/store/user'
import { filterCoin2 } from '@/utils/public'
import { ElNotification } from 'element-plus'
import { withdrawSubmit, getWithdrawAddressList } from '@/api/account'
import { priceFormat } from '@/utils/decimal'
import { _timeFormat } from '@/utils/public'
import { getWithdrawList, getBonsList } from '@/api/account'
const router = useRouter()
const mainStore = useMainStore()
const userStore = useUserStore()
const { asset } = storeToRefs(userStore)
const { userInfo } = storeToRefs(userStore)
const formRef = useTemplateRef('formRef')
const form = ref({
  coinType: '',
  title: '',
  address: '',
  allAmount: '',
  password: ''
})
const rules = ref({
  coinType: [{ required: true, message: '请选择币种', trigger: 'change' }],
  address: [{ required: true, message: '请选择地址', trigger: 'change' }],
  allAmount: [{ required: true, message: '请输入提款金额', trigger: 'change' }],
  password: [{ required: true, message: '请输入提现密码', trigger: 'change' }]
})
const list = ref([])
const coinList = computed(() => {
  let list = []
  mainStore.getWithdrawList.forEach((item, index) => {
    if (item.status == '1') {
      let obj = {}
      obj['type'] = 1 //提现
      obj['ratio'] = item.ratio || '' //手续费
      obj['fee'] = item.fee //固定手续费
      // type:0数据货币，1银行卡
      obj['icon'] = item.rechargeType
      obj['title'] = item.rechargeName
      list.push(obj)
    }
  })
  return list
})
const addressList = ref([])
const saveCacheAddressFn = () => {
  getWithdrawAddressList().then((res) => {
    if (res.data.length > 0) {
    } else {
      router.push('/withdrawDeposit')
    }
    addressList.value = res.data.map((item) => ({
      ...item,
      title: item.symbol.toUpperCase()
    }))
  })
}
const info = ref({ icon: '' })
const handleChange = (value) => {
  info.value.icon = list.value.find((item) => item.title == value)?.icon
}
const amount = computed(() => {
  let data = 0
  //查询余额
  for (let i = 0; i < asset.value.length; i++) {
    // 币种提现
    if (asset.value[i].type == 1 && filterCoin2(asset.value[i].symbol) == info.value?.icon) {
      data = asset.value[i].availableAmount
    }
  }
  return data
})
const allNum = () => {
  form.value.allAmount = Number(String(amount.value).split('.')[0])
}
// 阻止非数字键（只允许 0-9）
const onKeyPress = (e) => {
  const char = String.fromCharCode(e.which)
  if (!/^\d$/.test(char)) {
    e.preventDefault()
  }
}
const submit = async () => {
  await formRef.value.validate((valid) => {
    if (valid) {
      let params = {
        amount: form.value.allAmount,
        coinType: form.value.coinType,
        pwd: form.value.pwd,
        adress: form.value.address,
        coin: info.value?.icon,
        code: ''
      }
      let str = `amount=${params.amount}&coinType=${params.coinType}&pwd=${encodeURIComponent(params.pwd)}&adress=${params.adress}&coin=${params.coin}&code=${params.code}`
      withdrawSubmit(str).then((res) => {
        if (res.code == '200') {
          ElNotification({
            title: '提币成功',
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
    }
  })
}
const rowList = ref([])
const getWithdrawListFun = async () => {
  let str = 'pageNum=1&pageSize=100000'
  let res1 = await getWithdrawList(str)
  let arr1 = []
  if (res1.code == 200) {
    arr1 = res1.rows.map((item) => ({
      ...item
    }))
  } else {
    arr1 = []
  }
  let res2 = await getBonsList(str)
  let arr2 = res2.rows
    .map((item) => ({
      ...item,
      orderType: 2
    }))
    .filter((item) => {
      return item.giveType == 2 && item.async == 1
    })
  rowList.value = [...arr1, ...arr2]
    .sort((a, b) => {
      return new Date(b.params.createTime) - new Date(a.params.createTime)
    })
    .slice(0, 10)
}
onMounted(() => {
  list.value = coinList.value
  // if (userInfo.value.detail?.userTardPwd == null) {
  //   showToast(t('pleaseSetFundPassword'))
  //   setTimeout(() => {
  //     router.push('/fund-password')
  //   }, 800)
  //   return
  // }
  saveCacheAddressFn()
  getWithdrawListFun()
})
</script>
<style lang="scss" scoped>
@import './index.css';
:deep(.el-form-item__label) {
  vertical-align: middle;
  font-size: 0.32rem;
  font-weight: 400;
  padding-bottom: 0;
  line-height: 0.48rem;
  margin: 0;
  color: var(--font);
  float: none;
  box-sizing: border-box;
  display: inline-block;
  text-align: left;
}
:deep(.el-textarea__inner) {
  background: transparent;
  box-shadow: 0 0 0 1px #2b2b35;
}
:deep(.el-collapse-item__header) {
  transition: all 0.3s ease-in-out;
  border-radius: 0.2rem;
  padding: 0.067rem;
  border: none;
  background-color: var(--card);
  color: var(--onsurface);
  font-size: 0.24rem;
  height: 0.8rem;
  &:hover {
    background-color: var(--hoverBg);
  }
  &.is-active {
    border-radius: 0.2rem 0.2rem 0 0;
    background-color: var(--hoverBg);
  }
}
:deep(.el-collapse-item__wrap) {
  background-color: var(--hoverBg);
  border-radius: 0 0 0.2rem 0.2rem;
  padding: 0 0.4rem;
  border: none !important;
}
:deep(.el-collapse-item__content) {
  color: var(--remarkColor);
  font-size: 0.24rem;
  padding-bottom: 0.333rem;
  line-height: 1.7692307692;
}
:deep(.el-select__wrapper) {
  width: 7.28rem;
  height: 0.64rem;
  border-radius: 0.16rem;
  border: none;
  text-align: center;
  color: #a6a6a6;
  font-size: 0.24rem;
  font-weight: 500;
  border: 0.013rem solid #2b2b35;
  box-shadow: 0 0 0 1px #2b2b35 inset;
  background-color: #121212;
}
:deep(.el-input__wrapper) {
  width: 7.28rem;
  height: 0.64rem;
  border-radius: 0.16rem;
  border: none;
  text-align: center;
  color: #a6a6a6;
  font-size: 0.24rem;
  font-weight: 500;
  border: 0.013rem solid #2b2b35;
  box-shadow: 0 0 0 1px #2b2b35 inset;
  background-color: #121212;
}
:deep(.is-focused) {
  box-shadow: 0 0 0 1px #2b2b35 inset;
}
:deep(.el-popper__arrow) {
  display: none;
}
:deep(.el-select__popper.el-popper) {
  border: none;
}
.table-empty {
  margin: 2.667rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.el-table {
  background-color: transparent;
}
.el-table:before {
  display: none;
}
:deep(.el-table tr) {
  background-color: transparent !important;
  border: none;
}
:deep(.el-table td.el-table__cell) {
  border: none;
}
:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background-color: transparent !important;
}
:deep(.el-table__row:hover) {
  background-color: #212121 !important;
  color: #fff !important;
}
:deep(.el-table--fit .el-table__inner-wrapper:before) {
  display: none;
}
</style>

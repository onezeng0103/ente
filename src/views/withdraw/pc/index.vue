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
                    <el-select
                      popper-class="withdraw-currency-popper"
                      v-model="form.coinType"
                      placeholder="请选择"
                      @change="handleChange"
                    >
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
                    <el-select
                      popper-class="withdraw-currency-popper"
                      v-model="form.address"
                      placeholder="请选择"
                    >
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
            <span @click="router.push('/cashflow?id=5')">查看历史记录</span>
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
              <NoData />
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
    if (res.data.length == 0) {
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
  if (userInfo.value.detail?.userTardPwd == null) {
    ElNotification({
      title: '请先设置提现密码',
      type: 'error'
    })
    setTimeout(() => {
      router.push('/fund-password')
    }, 800)
    return
  }
  saveCacheAddressFn()
  getWithdrawListFun()
})
</script>
<style lang="scss" scoped>
@import './index.css';
:deep(.el-select-dropdown) {
  top: -10px !important;
  margin: 0 !important;
  border-radius: 0.16rem !important;
  border: 0.5px solid #858586 !important;
  background-color: #242731 !important;
}
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

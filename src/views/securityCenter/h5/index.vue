<script setup>
import navigation from '@/component/h5/navigation/index.vue'
import router from '@/router/index.js'
</script>

<template>
  <navigation title="安全中心"></navigation>
  <ul class="securityCenter-list">
    <li>
      <span>更改密碼</span>
      <span @click="router.push('/changePassword')">
        <span>修改</span>
        <i class="el-icon-arrow-right"></i>
      </span>
    </li>
    <li>
      <span>交易密碼</span>
      <span @click="router.push('/fund-password')">
        <span>設置</span>
        <i class="el-icon-arrow-right"></i>
      </span>
    </li>
    <li>
      <span>電子郵箱</span>
      <span @click="router.push('/emailAuthentication')">
        <span>設置</span>
        <i class="el-icon-arrow-right"></i>
      </span>
    </li>
    <li>
      <span>手机号码</span>
      <span @click="router.push('/phoneAuth')">
        <span>設置</span>
        <i class="el-icon-arrow-right"></i>
      </span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.securityCenter-list {
  background-color: #ffffff;
  flex: 1;
  //margin: 0.4rem 0;
  padding: 0.8rem 0.4rem 0;

  li {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-bottom: 0.533rem;

    span {
      font-size: 0.427rem;
      font-weight: 400;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      color: #000000;
    }
  }
}
</style>

<script setup>
const props = defineProps({
  drawer: Boolean
})
</script>

<template>
  <div class="drawer" :class="{ show: props.drawer }">
    <div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.533rem">
        <div class="but">登陆</div>
        <div class="but" style="background-color: #000000; color: #ffffff">注册</div>
      </div>

      <div class="box-title">常用功能</div>
      <div class="box-table">
        <div class="table-content">
          <i class="iconfont icon-a-international1"></i>
          <span>語言</span>
        </div>
        <div class="table-content">
          <i class="iconfont icon-yaoqing"></i>
          <span>邀請</span>
        </div>
        <div class="table-content">
          <i class="iconfont icon-a-zichanguanli4"></i>
          <span>資金記錄</span>
        </div>
        <div class="table-content">
          <i class="iconfont icon-shandui"></i>
          <span>閃兌</span>
        </div>
      </div>

      <div class="box-title">市場</div>
      <div class="box-table">
        <div class="table-content">
          <i class="iconfont icon-jiamihuobi"></i>
          <span>加密貨幣</span>
        </div>
        <div class="table-content">
          <i class="iconfont icon-waihui"></i>
          <span>FX</span>
        </div>
      </div>

      <div class="box-title">金融</div>
      <div class="box-table">
        <div class="table-content">
          <i class="iconfont icon-a-jiedai1"></i>
          <span>借貸</span>
        </div>
      </div>
      <div class="box-title">其他</div>
      <div class="box-table">
        <div class="table-content">
          <i class="iconfont icon-gonggao"></i>
          <span>公告</span>
        </div>
        <div class="table-content">
          <i class="iconfont icon-a-xinwen1"></i>
          <span>新聞</span>
        </div>
        <div class="table-content">
          <i class="iconfont icon-guangbo"></i>
          <span>直播</span>
        </div>
        <div class="table-content">
          <i class="iconfont icon-anquanzhongxin"></i>
          <span>安全中心</span>
        </div>
        <div class="table-content">
          <i class="iconfont icon-User"></i>
          <span>KYC</span>
        </div>
      </div>
      <div class="box-title">下载</div>
      <div class="box-table">
        <div class="table-content">
          <i class="iconfont icon-a-anzhuo2"></i>
          <span>Android</span>
        </div>
        <div class="table-content">
          <i class="iconfont icon-a-pingguo62"></i>
          <span>IOS</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.drawer {
  background: #fff;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: -100%;
  bottom: 0;
  z-index: 9;
  padding: 70px 10px 0 10px;
  transition: all 0.3s ease;

  .box-table {
    display: grid;
    grid-gap: 0.133rem;
    grid-template-columns: repeat(4, 24%);
    grid-auto-rows: 2rem;

    .table-content {
      padding: 0.2rem 0;
      border-radius: 0.4rem;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      justify-content: space-evenly;
      -webkit-box-align: center;
      align-items: center;
      font-size: 0.427rem;

      i {
        font-size: 0.64rem;
        color: #000;
        align-self: center;
      }
    }
  }

  .box-title {
    color: #000;
    margin-left: 0.16rem;
    font-size: 0.4rem;
    padding: 0.267rem 0;
    font-weight: 700;
    margin-top: 10px;
  }

  .but {
    width: 185px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    border-radius: calc(infinity * 0.013rem);
    border: 0.013rem solid #8c8c8c;
  }
}

.show {
  right: 0;
}
</style>

<template>
  <div
    class="header-container is-fixed is-small w-full flex justify-center max-h mobile-height is-scrolly"
  >
    <header id="header_main" class="header max-h">
      <div class="container-fluid max-h w-100">
        <div class="header__body d-flex justify-content-between max-h">
          <div class="header__left">
            <div class="logo">
              <img
                width="32"
                height="32"
                src="https://entsphere.com/exchange/rockieFile/getFileExt/9004441.js"
                alt=""
                data-retina="assets/images/logo/logo-dark@2x.png"
              />
              <span class="logo-text" style="margin-left: 0.2rem">{{ VITE_APP_TITLE }}</span>
            </div>
          </div>
          <div></div>
          <div class="header__right">
            <div>
              <div class="navPopup">
                <div data-v-a1bb6260="" class="showCredit"></div>
              </div>
            </div>
            <div class="right-c">
              <div class="mobile-login"></div>
              <div class="mobile-icon">
                <div></div>
                <div class="mobile-login-mn"></div>
                <div class="mobile-solid">
                  <i class="iconfont icon-a-tongzhi1 item-icon"></i>
                </div>
                <div class="mobile-button">
                  <i class="el-icon-s-fold item-icon"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script setup>
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <div class="wallet">
    <div class="wallet-header">
      <div class="wallet-header-info">
        <img :src="path" alt="" style="width: 43px; height: 43px; border-radius: 50%" />
        <div class="wallet-header-info-title">{{ userInfo?.user?.loginName }}</div>
        <div class="wallet-header-info-type">
          <CmImg v-if="advancedAuth == 1" name="ok" style="width: 13px; height: 13px" />
          <CmImg v-else name="no" style="width: 13px; height: 13px" />
          <span style="margin-left: 5px; font-size: 12px">
            <template v-if="advancedAuth == null || advancedAuth == 0">
              {{ t('notAuthenticated') }}
            </template>
            <template v-if="advancedAuth == 1">{{ t('authenticated') }}</template>
            <template v-if="advancedAuth == 3">{{ t('auditing') }}</template>
            <template v-if="advancedAuth == 2">{{ t('auditFailed') }}</template>
          </span>
        </div>
      </div>
      <div class="wallet-header-price">
        <div class="wallet-header-price-title">
          {{ t('asset') }}
          <div style="margin-left: 5px; display: flex; align-items: center">
            <svg
              @click="isEye = !isEye"
              v-if="!isEye"
              t="1747823302565"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="21623"
              width="15"
              height="15"
            >
              <path
                d="M801.2 570.4l-0.1-0.1c-0.2-0.4-0.5-0.7-0.8-1.1 40.1-25.4 79.1-56.7 116.8-93.7 13.7-13.5 14.5-36.9 1.7-51.5-12.1-13.8-31.9-14.6-44.9-1.8-151.6 149-319.9 192.7-500.7 130.1-75.3-26.1-137.8-66.3-176.9-95.5-18.7-14-34.1-26.8-45.5-36.8-13.2-11.7-32.3-10.3-43.9 3.2l-1.2 1.4 1.1-1.3c-13.1 15.2-11.6 39.4 3.2 52.5 26.5 23.5 71.7 59.8 130.7 93.3-0.1 0.2-0.2 0.3-0.4 0.5-0.1 0.1-0.2 0.3-0.3 0.4-0.4 0.6-0.8 1.1-1.2 1.7l-0.1 0.1c-0.3 0.5-0.7 1.1-1 1.7-0.1 0.2-0.2 0.3-0.3 0.5-0.3 0.6-0.7 1.3-1 1.9l-51.8 115.6c-1.8 4-2.7 8.2-2.8 12.4v1.6c0.1 3.6 0.8 7.2 2.1 10.5 0.3 0.7 0.6 1.5 0.9 2.2 0.3 0.7 0.7 1.4 1 2 0.2 0.4 0.5 0.9 0.8 1.3 3.2 5.2 8 9.6 14.1 12.3 0.5 0.2 1 0.4 1.6 0.7 0.2 0.1 0.3 0.1 0.5 0.2 0.4 0.1 0.7 0.3 1.1 0.4 0.2 0.1 0.4 0.1 0.6 0.2 0.3 0.1 0.6 0.2 1 0.3 0.2 0.1 0.5 0.1 0.7 0.2 0.3 0.1 0.6 0.2 0.9 0.2 0.2 0.1 0.5 0.1 0.7 0.1 0.3 0.1 0.6 0.1 0.9 0.2 0.2 0 0.5 0.1 0.7 0.1 0.3 0 0.6 0.1 0.9 0.1 0.2 0 0.5 0 0.7 0.1 0.3 0 0.6 0.1 0.9 0.1h2.2c0.6 0 1.2 0 1.8-0.1h0.2c0.7 0 1.3-0.1 2-0.2 0.2 0 0.3 0 0.5-0.1 0.6-0.1 1.1-0.2 1.7-0.3 0.1 0 0.2 0 0.3-0.1 0.7-0.1 1.3-0.3 1.9-0.5 0.2 0 0.3-0.1 0.4-0.1 0.5-0.2 1.1-0.3 1.6-0.5 0.1 0 0.2-0.1 0.4-0.1 0.6-0.2 1.2-0.5 1.9-0.8 0.1-0.1 0.3-0.1 0.4-0.2 0.5-0.2 1-0.5 1.5-0.8 0.1-0.1 0.2-0.1 0.4-0.2 0.6-0.3 1.2-0.7 1.7-1 0.1-0.1 0.2-0.1 0.3-0.2 0.5-0.3 1-0.6 1.4-1 0.1-0.1 0.2-0.2 0.4-0.3 0.5-0.4 1.1-0.8 1.6-1.3 0.1-0.1 0.2-0.2 0.3-0.2 0.4-0.4 0.9-0.8 1.3-1.2 0.1-0.1 0.2-0.2 0.4-0.3 0.5-0.5 0.9-1 1.4-1.5l0.2-0.2c0.4-0.5 0.8-0.9 1.2-1.4 0.1-0.1 0.2-0.3 0.3-0.4 0.4-0.6 0.8-1.1 1.2-1.7l0.1-0.1c0.3-0.5 0.7-1.1 1-1.7 0.1-0.2 0.2-0.3 0.3-0.5 0.3-0.6 0.7-1.3 1-1.9l16.1-35.8 35.8-79.8c0.7-1.5 1.2-3 1.6-4.5 17.4 7.9 35.7 15.4 54.7 22.1 14 4.9 28.1 9.3 42 13L369.9 776c-0.1 0.6-0.2 1.2-0.2 1.8-0.8 7.3 1 14.4 4.7 20.3l1.2 1.8 0.9 1.2c0.6 0.8 1.3 1.6 2 2.3l1.1 1.1c4.5 4.2 10.2 7.2 16.8 8.3 0.8 0.1 1.6 0.2 2.3 0.3h0.5c0.8 0.1 1.5 0.1 2.3 0.1h1.4c0.4 0 0.9 0 1.3-0.1h0.2c0.5 0 1-0.1 1.5-0.2 0.2 0 0.3 0 0.5-0.1 0.3-0.1 0.7-0.1 1-0.2 0.2 0 0.4-0.1 0.6-0.1 0.3-0.1 0.6-0.1 0.9-0.2 0.2 0 0.4-0.1 0.6-0.1 0.3-0.1 0.6-0.1 0.8-0.2 0.2-0.1 0.4-0.1 0.6-0.2 0.3-0.1 0.5-0.2 0.8-0.3 0.2-0.1 0.4-0.1 0.6-0.2 0.3-0.1 0.5-0.2 0.8-0.3 0.2-0.1 0.4-0.1 0.6-0.2 0.3-0.1 0.5-0.2 0.8-0.3 0.2-0.1 0.4-0.2 0.5-0.2 0.3-0.1 0.6-0.3 0.9-0.4 0.2-0.1 0.3-0.2 0.5-0.2 0.4-0.2 0.8-0.4 1.1-0.6 0.1 0 0.1-0.1 0.2-0.1 0.4-0.2 0.8-0.5 1.2-0.8 0.1-0.1 0.3-0.2 0.4-0.3 0.3-0.2 0.5-0.4 0.8-0.6 0.2-0.1 0.3-0.2 0.5-0.3 0.2-0.2 0.5-0.4 0.7-0.5 0.2-0.1 0.3-0.3 0.5-0.4 0.2-0.2 0.4-0.4 0.7-0.5 0.2-0.1 0.3-0.3 0.5-0.4l0.6-0.6c0.2-0.1 0.3-0.3 0.5-0.4l0.6-0.6 0.4-0.4c0.2-0.2 0.4-0.4 0.6-0.7l0.4-0.4c0.2-0.2 0.4-0.5 0.6-0.7 0.1-0.1 0.2-0.3 0.3-0.4 0.3-0.4 0.6-0.7 0.8-1.1l0.1-0.1c0.3-0.4 0.6-0.8 0.8-1.2 0.1-0.1 0.2-0.3 0.3-0.4 0.2-0.3 0.3-0.6 0.5-0.9 0.1-0.2 0.2-0.3 0.3-0.5 0.1-0.3 0.3-0.5 0.4-0.8l0.3-0.6c0.1-0.3 0.3-0.5 0.4-0.8l0.3-0.6c0.1-0.3 0.2-0.5 0.3-0.8 0.1-0.2 0.2-0.4 0.2-0.6 0.1-0.3 0.2-0.6 0.3-0.8 0.1-0.2 0.1-0.4 0.2-0.6l0.3-0.9c0.1-0.2 0.1-0.4 0.2-0.6 0.1-0.3 0.2-0.7 0.2-1 0-0.2 0.1-0.3 0.1-0.5l0.3-1.5 23.1-140.6c24.4 3.6 48.8 5.4 72.9 5.4 13.2 0 26.3-0.5 39.4-1.6l18.4 111.9 4 24.4 0.3 1.5c0 0.2 0.1 0.3 0.1 0.5 0.1 0.3 0.2 0.7 0.2 1 0.1 0.2 0.1 0.4 0.2 0.6l0.3 0.9c0.1 0.2 0.1 0.4 0.2 0.6 0.1 0.3 0.2 0.6 0.3 0.8 0.1 0.2 0.2 0.4 0.2 0.6 0.1 0.3 0.2 0.5 0.3 0.8l0.3 0.6c0.1 0.3 0.2 0.5 0.4 0.8l0.3 0.6c0.1 0.3 0.3 0.5 0.4 0.8 0.1 0.2 0.2 0.3 0.3 0.5 0.2 0.3 0.3 0.6 0.5 0.9 0.1 0.1 0.2 0.3 0.2 0.4 0.3 0.4 0.5 0.8 0.8 1.2v0.1c0.3 0.4 0.5 0.8 0.8 1.1 0.1 0.1 0.2 0.3 0.3 0.4 0.2 0.3 0.4 0.5 0.6 0.8l0.4 0.4c0.2 0.2 0.4 0.4 0.6 0.7l0.4 0.4 0.6 0.6 0.4 0.4 0.6 0.6c0.2 0.1 0.3 0.3 0.5 0.4 0.2 0.2 0.4 0.4 0.7 0.6 0.2 0.1 0.3 0.3 0.5 0.4 0.2 0.2 0.5 0.4 0.7 0.5 0.2 0.1 0.3 0.2 0.5 0.3 0.3 0.2 0.5 0.4 0.8 0.6 0.1 0.1 0.3 0.2 0.4 0.3 0.4 0.3 0.8 0.5 1.2 0.8 0 0 0.1 0 0.1 0.1 0.4 0.2 0.8 0.4 1.1 0.6 0.1 0.1 0.3 0.1 0.4 0.2 0.3 0.1 0.6 0.3 0.9 0.4 0.2 0.1 0.4 0.2 0.5 0.2 0.3 0.1 0.5 0.2 0.8 0.4 0.2 0.1 0.4 0.2 0.6 0.2 0.3 0.1 0.5 0.2 0.8 0.3 0.2 0.1 0.4 0.1 0.6 0.2 0.3 0.1 0.5 0.2 0.8 0.3 0.2 0.1 0.4 0.1 0.6 0.2 0.3 0.1 0.6 0.2 0.8 0.2 0.2 0.1 0.4 0.1 0.6 0.1 0.3 0.1 0.6 0.1 0.9 0.2 0.2 0 0.4 0.1 0.6 0.1 0.3 0.1 0.7 0.1 1 0.2 0.2 0 0.3 0.1 0.5 0.1 0.5 0.1 1 0.1 1.5 0.2h0.2c0.4 0 0.9 0.1 1.3 0.1H622.4c0.8 0 1.5 0 2.3-0.1h0.5c0.8-0.1 1.6-0.2 2.3-0.3 9.3-1.5 16.9-6.9 21.7-14.2 0.8-1.3 1.6-2.6 2.2-4 0.4-0.9 0.8-1.9 1.2-2.9 0.5-1.5 0.9-3 1.2-4.5s0.5-3.1 0.5-4.7v-1.6c0-1.1-0.1-2.2-0.2-3.2-0.1-0.5-0.1-1.1-0.2-1.6L631.7 640c38.5-8.4 76.2-21.7 113.1-39.7 0.1 0.2 0.1 0.3 0.2 0.5l51.8 115.6c0.3 0.7 0.6 1.3 1 1.9 0.1 0.2 0.2 0.3 0.3 0.5 0.3 0.6 0.6 1.1 1 1.7l0.1 0.1c0.4 0.6 0.8 1.2 1.2 1.7 0.1 0.1 0.2 0.3 0.3 0.4 0.4 0.5 0.8 1 1.1 1.4l0.2 0.2c0.5 0.5 0.9 1 1.4 1.5 0.1 0.1 0.2 0.2 0.4 0.3 0.4 0.4 0.9 0.8 1.3 1.2 0.1 0.1 0.2 0.2 0.3 0.2 0.5 0.4 1 0.9 1.6 1.3 0.1 0.1 0.2 0.2 0.4 0.3 0.5 0.3 0.9 0.7 1.4 1 0.1 0.1 0.2 0.1 0.3 0.2 0.6 0.4 1.1 0.7 1.7 1 0.1 0.1 0.2 0.1 0.4 0.2 0.5 0.3 1 0.5 1.5 0.8 0.1 0.1 0.3 0.1 0.4 0.2 0.6 0.3 1.2 0.5 1.9 0.8 0.1 0 0.2 0.1 0.4 0.1 0.5 0.2 1.1 0.4 1.6 0.5 0.2 0 0.3 0.1 0.5 0.1 0.6 0.2 1.3 0.3 1.9 0.5 0.1 0 0.2 0 0.3 0.1 0.6 0.1 1.1 0.2 1.7 0.3 0.2 0 0.3 0.1 0.5 0.1 0.7 0.1 1.3 0.2 2 0.2h0.2c0.6 0 1.2 0.1 1.8 0.1h2.2c0.3 0 0.6 0 0.9-0.1 0.2 0 0.5 0 0.7-0.1 0.3 0 0.6-0.1 0.9-0.1 0.2 0 0.5-0.1 0.7-0.1 0.3 0 0.6-0.1 0.9-0.2 0.2 0 0.5-0.1 0.7-0.1 0.3-0.1 0.6-0.1 0.9-0.2 0.2-0.1 0.5-0.1 0.7-0.2 0.3-0.1 0.6-0.2 1-0.3 0.2-0.1 0.4-0.1 0.6-0.2 0.4-0.1 0.7-0.2 1.1-0.4 0.2-0.1 0.3-0.1 0.5-0.2 0.5-0.2 1-0.4 1.6-0.7 16.1-7.2 23.3-26.2 16.1-42.3l-51.8-115.6c-0.3-0.7-0.6-1.3-1-1.9-0.1-0.2-0.2-0.3-0.3-0.5-0.4-0.5-0.7-1.1-1.1-1.7z"
                p-id="21624"
                fill="var(--secondary-svg)"
              ></path>
            </svg>
            <svg
              v-else
              @click="isEye = !isEye"
              t="1747823189861"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="20574"
              width="15"
              height="15"
            >
              <path
                d="M512 279.272727c171.985455 0 328.610909 162.909091 388.421818 232.727273-59.810909 69.818182-216.436364 232.727273-388.421818 232.727273S183.389091 581.818182 123.578182 512c59.810909-69.818182 216.436364-232.727273 388.421818-232.727273m0-69.818182C298.589091 209.454545 117.76 407.970909 56.785455 483.374545a44.916364 44.916364 0 0 0 0 57.25091C117.76 616.029091 298.589091 814.545455 512 814.545455s394.24-198.516364 455.214545-273.92a44.916364 44.916364 0 0 0 0-57.25091C906.24 407.970909 725.410909 209.454545 512 209.454545z"
                fill="var(--secondary-svg)"
                p-id="20575"
              ></path>
              <path
                d="M512 442.181818a69.818182 69.818182 0 1 1-69.818182 69.818182 69.818182 69.818182 0 0 1 69.818182-69.818182m0-69.818182a139.636364 139.636364 0 1 0 139.636364 139.636364 139.636364 139.636364 0 0 0-139.636364-139.636364z"
                fill="var(--secondary-svg)"
                p-id="20576"
              ></path>
            </svg>
          </div>
        </div>
        <div class="wallet-header-price-content">
          <template v-if="isEye">{{ _numberWithCommas(allSum) }}</template>
          <template v-else>****</template>
        </div>
      </div>
    </div>
    <div class="wallet-price">
      <div class="wallet-price-item">
        <div class="wallet-price-item-price">
          <template v-if="isEye">
            {{ _numberWithCommas(financSum) }}
          </template>
          <template v-else>****</template>
        </div>
        <div class="wallet-price-item-text">{{ t('financeAssets') }}</div>
      </div>
      <div class="wallet-price-item">
        <div class="wallet-price-item-price">
          <template v-if="isEye">
            {{ _numberWithCommas(contractSum) }}
          </template>
          <template v-else>****</template>
        </div>
        <div class="wallet-price-item-text">{{ t('contractAssets') }}</div>
      </div>
      <div class="wallet-price-item">
        <div class="wallet-price-item-price">
          <template v-if="isEye">
            {{ _numberWithCommas(platformSum) }}
          </template>
          <template v-else>****</template>
        </div>
        <div class="wallet-price-item-text">{{ t('availableBalance') }}</div>
      </div>
      <div class="wallet-price-item">
        <div class="wallet-price-item-price">
          <template v-if="isEye">
            {{ _numberWithCommas(zhanyong) }}
          </template>
          <template v-else>****</template>
        </div>
        <div class="wallet-price-item-text">{{ t('lockedAmount') }}</div>
      </div>
    </div>
    <div class="wallet-menu">
      <div class="wallet-menu-item" @click="handleMethod(0)">
        <div class="wallet-menu-item-icon">
          <CmImg name="recharge3" style="width: 28px; height: 28px" />
        </div>
        <div class="wallet-menu-item-text">{{ t('recharge') }}</div>
      </div>
      <div class="wallet-menu-item" @click="handleMethod(1)">
        <div class="wallet-menu-item-icon">
          <CmImg name="withdraw3" style="width: 28px; height: 28px" />
        </div>
        <div class="wallet-menu-item-text">{{ t('withdraw') }}</div>
      </div>
      <div class="wallet-menu-item" @click="router.push('/flashExchange')">
        <div class="wallet-menu-item-icon">
          <CmImg name="flashExchange3" style="width: 28px; height: 28px" />
        </div>
        <div class="wallet-menu-item-text">{{ t('flashExchange') }}</div>
      </div>
      <div class="wallet-menu-item" @click="router.push('/exchange')">
        <div class="wallet-menu-item-icon">
          <CmImg name="exchange3" style="width: 28px; height: 28px" />
        </div>
        <div class="wallet-menu-item-text">{{ t('transfer') }}</div>
      </div>
    </div>
    <div class="wallet-collapse">
      <van-collapse v-model="activeNames" :border="false">
        <van-collapse-item name="safety">
          <template #title>
            <div style="display: flex; align-items: center">
              <cmImg name="safetyCenter" style="height: 20px; width: 20px" />
              <span style="margin-left: 5px; color: var(--primary-color); font-size: 14px">
                {{ t('safetyCenter') }}
              </span>
            </div>
          </template>
          <div
            v-for="(item, index) in list"
            :key="index"
            style="margin-bottom: 15px"
            @click="handleClick(item.link)"
          >
            <div style="display: flex; align-items: center; justify-content: space-between">
              <div style="display: flex; align-items: center">
                <cmImg :name="item.icon" style="height: 20px; width: 20px"></cmImg>
                <span style="margin-left: 15px; color: var(--primary-color); font-size: 12px">
                  {{ item.title }}
                </span>
              </div>

              <div>
                <svg
                  t="1748260427853"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4161"
                  width="15"
                  height="15"
                >
                  <path
                    d="M704 512c0-8.288-3.232-15.776-8.4-21.456l0.08-0.064-320-352-0.08 0.08A31.76 31.76 0 0 0 352 128a32 32 0 0 0-32 32c0 8.288 3.232 15.76 8.4 21.456l-0.08 0.08L628.752 512 328.32 842.464l0.08 0.08A31.776 31.776 0 0 0 320 864a32 32 0 0 0 32 32 31.84 31.84 0 0 0 23.6-10.544l0.08 0.08 320-352-0.08-0.08c5.168-5.68 8.4-13.168 8.4-21.456z"
                    fill="var(--secondary-svg)"
                    p-id="4162"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item
          v-for="(item, index) in moreList"
          :key="index"
          :name="index"
          :readonly="true"
          @click="handleMore(item)"
        >
          <template #title>
            <div style="display: flex; align-items: center">
              <cmImg :name="item.icon" style="height: 20px; width: 20px" />
              <span style="margin-left: 5px; color: var(--primary-color); font-size: 12px">
                {{ item.title }}
              </span>
            </div>
          </template>
          <template #right-icon>
            <svg
              t="1748260427853"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4161"
              width="15"
              height="15"
            >
              <path
                d="M704 512c0-8.288-3.232-15.776-8.4-21.456l0.08-0.064-320-352-0.08 0.08A31.76 31.76 0 0 0 352 128a32 32 0 0 0-32 32c0 8.288 3.232 15.76 8.4 21.456l-0.08 0.08L628.752 512 328.32 842.464l0.08 0.08A31.776 31.776 0 0 0 320 864a32 32 0 0 0 32 32 31.84 31.84 0 0 0 23.6-10.544l0.08 0.08 320-352-0.08-0.08c5.168-5.68 8.4-13.168 8.4-21.456z"
                fill="var(--secondary-svg)"
                p-id="4162"
              ></path>
            </svg>
          </template>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
  <TypeMethod
    :showBottom="showRecharge"
    :methodType="methodType"
    :methodList="methodList"
    @close="showRecharge = false"
  />
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user/index'
import { useMainStore } from '@/store'
import { _numberWithCommas } from '@/utils/public'
import { _add } from '@/utils/decimal'
import { priceFormat } from '@/utils/decimal.js'
import { getFinanceAmountApi } from '@/api/common/index.js'
import { signOut } from '@/api/user'
import router from '@/router'
import { showToast } from 'vant'
import { dispatchCustomEvent } from '@/utils'
import { useI18n } from 'vue-i18n'
import TypeMethod from '@/components/typeMethod/index.vue'
const mainStore = useMainStore()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const showRecharge = ref(false)
const methodList = ref([])
const methodType = ref(0)
const { t } = useI18n()
const handleMethod = (type) => {
  methodType.value = type
  if (type == 0) {
    methodList.value = [
      {
        name: t('recharge'),
        icon: 'recharge2',
        tip: t('fromChainWalletOrOtherExchange'),
        link: '/recharge'
      }
    ]
  } else {
    methodList.value = [
      {
        name: t('withdraw'),
        icon: 'recharge2',
        tip: t('fromChainWalletOrOtherExchange'),
        link: '/withdraw'
      }
    ]
  }
  showRecharge.value = true
}
const path = computed(() => {
  let tempPath = mainStore.getLogoList?.logo || mainStore.getLogoList?.logoD
  return tempPath
})
const advancedAuth = computed(() => {
  return userInfo.value.detail?.auditStatusAdvanced
})
const isEye = ref(true)
// 用户余额信息
const { asset } = storeToRefs(userStore)
const getDetail = (item) => {
  let obj = {}
  obj['keyong'] = priceFormat(item.availableAmount)
  obj['zhanyong'] = priceFormat(item.occupiedAmount)

  obj['zhehe'] = priceFormat(item.exchageAmount)
  if (item.symbol == 'usdt') {
    obj['icon'] = 'usdt'
    obj['loge'] = item.loge
    obj['title'] = 'USDT'
  } else {
    obj['loge'] = item.loge
    obj['title'] = item.symbol?.replace('usdt', '').trim().toLocaleUpperCase()
    obj['icon'] = item.symbol?.replace('usdt', '').trim()
  }
  return obj
}
//获取平台资产信息
const getPlatform = computed(() => {
  let list = []
  asset.value.forEach((item, index) => {
    if (item.type == 1) {
      list.push(getDetail(item))
    }
  })

  return list
})
//计算平台余额
const platformSum = computed(() => {
  let sum = 0
  for (let i = 0; i < getPlatform.value.length; i++) {
    sum += Number(getPlatform.value[i].zhehe)
  }
  return priceFormat(sum)
})
//获取理财资产信息
const getFinanc = computed(() => {
  let list = []
  asset.value.forEach((item, index) => {
    if (item.type == 2) {
      list.push(getDetail(item))
    }
  })
  return list
})
//计算理财余额
const financSum = computed(() => {
  let sum = 0
  for (let i = 0; i < getFinanc.value.length; i++) {
    sum += Number(getFinanc.value[i].zhehe)
  }
  return priceFormat(sum)
})
//获取合约资产信息
const getContarct = computed(() => {
  let list = []
  asset.value.forEach((item, index) => {
    if (item.type == 3) {
      list.push(getDetail(item))
    }
  })
  return list
})
//计算合约余额
const contractSum = computed(() => {
  let sum = 0
  for (let i = 0; i < getContarct.value.length; i++) {
    sum += Number(getContarct.value[i].zhehe)
  }
  return priceFormat(sum)
})
const zhanyong = ref()
// 计算所有余额
const allSum = computed(() => {
  return priceFormat(
    Number(platformSum.value) + Number(financSum.value) + Number(contractSum.value)
  )
})
const activeNames = ref([])
const list = ref([
  {
    title: t('realNameAuthentication'),
    icon: 'userauth',
    link: '/userauth'
  },
  {
    title: t('modifyPassword'),
    icon: 'changePassword',
    link: '/changePassword'
  },
  {
    title: t('bindWithdrawPassword'),
    link: '/fund-password',
    icon: 'fund-password'
  },
  {
    title: t('bindWithdrawAddress'),
    icon: 'withdrawDeposit',
    link: '/withdrawDeposit'
  },
  {
    title: t('bindPhoneNumber'),
    icon: 'bindPhoneNumber',
    link: ''
  },
  {
    title: t('bindEmail'),
    icon: 'emailAuthentication',
    link: '/emailAuthentication'
  }
])
const moreList = ref([
  {
    title: t('cashflow'),
    link: '/cashflow',
    key: 'cashflow',
    icon: 'cashflow'
  },
  {
    title: t('onlineCustomerService'),
    link: '',
    key: 'onlineService',
    icon: 'onlineService'
  },
  {
    title: t('serviceTerms'),
    link: '/termService',
    key: 'serviceTerms',
    icon: 'serviceTerms'
  },
  {
    title: t('helpCenter'),
    link: '/help',
    key: 'help',
    icon: 'help'
  },
  {
    title: t('aboutUs'),
    link: '/about',
    key: 'aboutUs',
    icon: 'aboutUs'
  },
  {
    title: t('switchLanguage'),
    link: '/langList',
    key: 'switchLanguage',
    icon: 'switchLanguage'
  },
  {
    title: t('APPDownload'),
    link: '/download',
    key: 'appDownload',
    icon: 'appDownload'
  },
  {
    title: t('logout'),
    link: '',
    key: 'logout',
    icon: 'logout'
  }
])
const handleMore = (item) => {
  console.log('zhixing')
  if (item.key == 'logout') {
    signOut()
      .then((res) => {
        if (res.code == '200') {
          showToast(t('logoutSuccess'))
          userStore.signOut()
          router.replace('/')
          handleClose()
          isSign.value = false
          setTimeout(() => location.reload(), 10)
        } else {
          showToast(res.msg)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  } else if (item.key == 'onlineService') {
    dispatchCustomEvent('event_serviceChange')
  } else {
    router.push(item.link)
  }
}
const handleClick = (link) => {
  if (link) {
    router.push(link)
  }
}
onMounted(() => {
  getFinanceAmountApi().then((res) => {
    zhanyong.value = priceFormat(res.data.financial + res.data.pledge)
  })
})
</script>
<style lang="scss" scoped>
.wallet {
  padding: 10px 15px 100px;
  &-header {
    background: var(--seventh-background);
    border-radius: 6px;
    padding: 10px;
    &-info {
      display: flex;
      align-items: center;

      &-title {
        margin-left: 10px;
        margin-right: 5px;
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-color);
      }
      &-type {
        display: flex;
        align-items: center;
        color: var(--secondary-color);
        img {
          margin: 0 5px;
        }
      }
    }
    &-price {
      margin-top: 10px;
      &-title {
        display: flex;
        align-items: center;
        color: var(--third-color);
      }
      &-content {
        margin-top: 10px;
        font-size: 28px;
        color: var(--primary-color);
        font-weight: 600;
      }
    }
  }
  &-price {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-item {
      width: 45%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      &-price {
        font-size: 14px;
        color: var(--third-color);
      }
      &-text {
        margin-top: 5px;
        font-size: 10px;
        color: var(--primary-color);
      }
    }
  }
  &-menu {
    margin-top: 15px;
    background: var(--secondary-background);
    padding: 10px 20px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &-icon {
        width: 28px;
        height: 28px;
      }
      &-text {
        margin-top: 5px;
        font-size: 10px;
        color: var(--primary-color);
      }
    }
  }
  &-collapse {
    margin-top: 15px;
  }
  :deep(.van-cell) {
    border: none;
    background: var(--seventh-background);

    &:after {
      border-bottom: 0 !important;
    }
  }

  :deep(.van-collapse-item__content) {
    background: var(--seventh-background);
    padding: 0 16px 10px;
  }

  .van-collapse {
    border-radius: 8px 8px 8px 8px;
    overflow: hidden;
  }

  .van-collapse-item--border:after {
    border-top: 0;
  }
}
</style>

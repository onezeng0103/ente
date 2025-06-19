<template>
  <div class="setpwd">
    <TopBar :title="t('setPassword')" />
    <div class="setpwd-form">
      <div class="setpwd-form-item">
        <div class="setpwd-form-item-label">{{ t('loginPassword') }}</div>
        <div class="setpwd-form-item-input">
          <input type="password" v-model="password" :placeholder="t('pleaseInputLoginPassword1')" />
        </div>
      </div>
      <div class="setpwd-form-item">
        <div class="setpwd-form-item-label">{{ t('confirmPassword') }}</div>
        <div class="setpwd-form-item-input">
          <input
            type="password"
            v-model="password2"
            :placeholder="t('confirmPasswordPlaceholder')"
          />
        </div>
      </div>
    </div>
    <div class="setpwd-btn" @click="submit">{{ t('submit') }}</div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { backPwdToEmail } from '@/api/user'
import { showToast } from 'vant'
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const password = ref('')
const password2 = ref('')
const submit = () => {
  if (password.value !== password2.value) {
    showToast(t('twoPasswordNotMatch'))
    return
  }
  if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/.test(password.value)) {
    showToast(t('pleaseInputPassword2'))
    return
  }
  backPwdToEmail(route.query.email, password.value, route.query.code).then((res) => {
    if (res.code == '200') {
      showToast(res.msg)
      setTimeout(() => {
        router.replace('/login')
      }, 500)
    } else {
      showToast(res.msg)
    }
  })
}
</script>
<style lang="scss" scoped>
.setpwd {
  padding: 44px 15px 0px;
  &-form {
    margin-top: 20px;
    &-item {
      margin-bottom: 30px;
      &:last-child {
        margin-bottom: 0;
      }
      &-label {
        font-size: 20px;
        color: var(--primary-color);
        font-weight: 600;
      }
      &-input {
        margin-top: 10px;
        padding: 10px;
        border-bottom: 1px solid var(--third-border);
        display: flex;
        align-items: center;
        justify-content: space-between;
        input {
          flex: 1;
        }
      }
    }
  }
  &-btn {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--third-background);
    border-radius: 24px 24px 24px 24px;
    height: 43px;
    width: 100%;
    color: var(--fourth-color);
    font-size: 18px;
    font-weight: 600;
  }
}
</style>

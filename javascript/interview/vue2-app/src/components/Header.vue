<template>
  <div class="header">
    <div class="header__logo">面試題(Vue2)</div>
    <div class="menu header__menu" />
    <div class="header__account">尚未登入</div>
    <div class="header__nav">
      <div class="header__nav__fixed">
        <div class="logout" :style="{cursor: 'pointer'}">登出</div>
        <div class="close" />
      </div>
      <router-link class="header__nav__link" to="/login">登入</router-link>
      <router-link class="header__nav__link" to="/">私有路由(登入可見)</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

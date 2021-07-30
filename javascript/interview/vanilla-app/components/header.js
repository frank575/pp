export { Header }

const Header = `
<div class="header__logo">面試題(Vanilla)</div>
<div class="menu header__menu"></div>
<div class="header__account">尚未登入</div>
<div class="header__nav">
  <div class="header__nav__fixed">
    <div class="logout" style="cursor: pointer;">登出</div>
    <div class="close"></div>
  </div>
  <div class="header__nav__link" data-to="/login">登入</div>
  <div class="header__nav__link" data-to="/">私有路由(登入可見)</div>
</div>
`

import './style/main.scss'
import { Header } from './components/header'
import { Login } from './pages/login'
import { Home } from './pages/home'

const _Header = document.createElement('div')
_Header.className = 'header'
_Header.innerHTML = Header

const _Login = document.createElement('div')
_Login.className = 'login'
_Login.innerHTML = Login

const _Home = document.createElement('div')
_Home.className = 'home'
_Home.innerHTML = Home


Array.from(_Header.querySelectorAll('.header__nav__link')).forEach(e => e.addEventListener('click', () => {
  const Content = document.querySelector('#content')
  const to = e.dataset.to
  const Component = to === '/' ? _Home : _Login
  Content.innerHTML = ''
  Content.append(Component)
}))

document.querySelector('#app').prepend(_Header)
document.querySelector('#content').append(_Login)

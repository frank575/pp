import {Link} from 'react-router-dom'

export const Header = () => {
	return (
		<header>
			<div>logo</div>
			<Link to={'/'}>首頁</Link>
			<Link to={'/news'}>最新消息</Link>
		</header>
	)
}

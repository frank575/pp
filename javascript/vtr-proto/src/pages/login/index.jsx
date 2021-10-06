import { Button, Form, Input } from 'antd'
import { useHistory } from 'react-router-dom'

export default () => {
	const history = useHistory()
	const onLogin = _data => {
		console.log(_data)
		history.replace('/')
	}

	return (
		<div className="bg-gray-200 min-h-screen flex items-center justify-center">
			<div className="bg-white rounded p-4">
				<div className="font-bold text-lg mb-4 text-center">登入</div>
				<Form
					name={'form'}
					colon={false}
					labelCol={{ className: 'w-20 text-left' }}
					onFinish={onLogin}
				>
					<Form.Item
						name={'email'}
						label={'信箱'}
						rules={[{ required: true }, { type: 'email' }]}
					>
						<Input placeholder={'請輸入信箱'} className={'w-60'} />
					</Form.Item>
					<Form.Item
						name={'captcha'}
						label={'驗證碼'}
						rules={[{ required: true }]}
					>
						<Input placeholder={'請輸入信件中的驗證碼'} />
					</Form.Item>
					<div className="text-center">
						<Button type={'primary'} htmlType={'submit'}>
							登入
						</Button>
					</div>
				</Form>
			</div>
		</div>
	)
}

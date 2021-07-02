import { Button, Form, Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useLoginService } from '@/pages/account/login/useLoginService'
import { Link } from 'react-router-dom'
import { Wrap } from '@/pages/account/components/wrap'

export default () => {
	const loginService = useLoginService()
	return (
		<Wrap title={'登入'}>
			<Form name={'login-form'} onFinish={loginService.onLogin}>
				<Form.Item
					label={'帳號'}
					name={'username'}
					initialValue={loginService.initialUsername}
					rules={[
						{
							validator: loginService.usernameValidator,
						},
					]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input placeholder={'frank@handsome.com'} />
				</Form.Item>
				<Form.Item
					label={'密碼'}
					name={'password'}
					initialValue={loginService.initialPassword}
					rules={[
						{
							validator: loginService.passwordValidator,
						},
					]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input.Password
						placeholder={'0000'}
						iconRender={visible =>
							visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
						}
					/>
				</Form.Item>
				<div className="text-right">
					<Link to={'/register'}>
						<Button className="mr-2">註冊</Button>
					</Link>
					<Button
						type="primary"
						htmlType="submit"
						loading={loginService.submitLoading}
					>
						登入
					</Button>
				</div>
			</Form>
		</Wrap>
	)
}

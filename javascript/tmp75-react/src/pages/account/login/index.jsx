import { Button, Form, Input } from 'antd'
import { useLoginService } from '@/pages/account/login/useLoginService'

export default () => {
	const loginService = useLoginService()
	return (
		<div className="bg-gray-200 min-w-max min-h-screen flex items-center justify-center ">
			<div className="p-6 bg-white shadow-md">
				<div className="text-lg font-bold mb-4 text-center">登入</div>
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
						<Input placeholder={'0000'} type={'password'} />
					</Form.Item>
					<div className="text-right">
						<Button type="primary" htmlType="submit">
							登入
						</Button>
					</div>
				</Form>
			</div>
		</div>
	)
}

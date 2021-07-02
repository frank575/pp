import { Wrap } from '@/pages/account/components/wrap'
import { Button, Form, Input } from 'antd'
import { useRegisterService } from '@/pages/account/register/useRegisterService'
import { Link } from 'react-router-dom'

export default () => {
	const registerService = useRegisterService()
	return (
		<Wrap title={'註冊'}>
			<Form
				name={'register-form'}
				onFinish={registerService.onRegister}
				labelAlign={'left'}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
			>
				<Form.Item
					label={'帳號'}
					name={'username'}
					rules={[
						{ required: true, message: '帳號為必填' },
						{ type: 'email', message: '必須為email' },
					]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input placeholder={'請輸入email'} />
				</Form.Item>
				<Form.Item
					label={'密碼'}
					name={'password'}
					rules={[
						{ required: true, message: '密碼為必填' },
						{ min: 4, max: 10, message: '必須為4-20個字元' },
					]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input placeholder={'4-20位字元'} type={'password'} />
				</Form.Item>
				<Form.Item
					label={'確認密碼'}
					name={'password2'}
					required
					rules={[
						({ getFieldValue }) => ({
							validator: registerService.password2Validator(getFieldValue),
						}),
					]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input placeholder={'4-20位字元'} type={'password'} />
				</Form.Item>
				<div className={'text-right'}>
					<Link to={'/login'}>
						<Button className={'mr-2'}>返回登入</Button>
					</Link>
					<Button type={'primary'} htmlType={'submit'}>
						註冊
					</Button>
				</div>
			</Form>
		</Wrap>
	)
}

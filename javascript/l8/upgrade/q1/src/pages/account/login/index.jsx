import { Wrap } from '@/pages/account/wrap'
import { Input } from '@/components/form/input'
import { Button } from '@/components/button'
import { Link } from 'react-router-dom'
import { useForm } from '@/components/form/lib/validator'

export default () => {
	const form = useForm({
		username: '',
		password: '',
	})
	const onSubmit = async () => {
		const { data } = await form.submit()
		console.log(data)
	}
	return (
		<Wrap title={'登入'}>
			<Input
				className="mb-4"
				ref={form.refs.username.ref}
				labelWidth={80}
				label={'帳號'}
				defaultValue={import.meta.env.VITE_USERNAME}
			/>
			<Input
				className="mb-4"
				ref={form.refs.password.ref}
				htmlType={'password'}
				togglePassword
				labelWidth={80}
				label={'密碼'}
				defaultValue={import.meta.env.VITE_PASSWORD}
			/>
			<div className="text-center mt-4">
				<div className="text-center mb-4">
					<Link className="text-primary text-sm" to={'/register'}>
						註冊
					</Link>
				</div>
				<Button onClick={onSubmit}>登入</Button>
			</div>
		</Wrap>
	)
}

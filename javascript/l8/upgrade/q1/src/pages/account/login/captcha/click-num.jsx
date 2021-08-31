import { useVisible } from '@/hooks/use-visible'
import { ModalWrap } from '@/pages/account/login/captcha/modal-wrap'
import { useMemo, useState } from 'react'

export const ClickNumCaptcha = ({
	visible: propVisible,
	onChangeVisible,
	onLogin,
}) => {
	const [visible, setVisible] = useVisible(propVisible, onChangeVisible)
	const [isSmall, setIsSmall] = useState(false)
	const title = useMemo(() => {
		const [b, a] = isSmall ? '大小' : '小大'
		return `請由數字最${b}點到最${a}`
	}, [isSmall])

	return (
		<ModalWrap visible={visible} setVisible={setVisible}>
			<div className="relative text-center">
				<div className="bg-white" style={{ width: 450, height: 300 }}></div>
				<div className="text-white mt-5">{title}</div>
			</div>
		</ModalWrap>
	)
}

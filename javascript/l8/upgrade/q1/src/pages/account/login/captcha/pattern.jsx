import { useVisible } from '@/hooks/use-visible'
import { ModalWrap } from '@/pages/account/login/captcha/modal-wrap'

export const PatternCaptcha = ({
	visible: propVisible,
	onChangeVisible,
	onLogin,
}) => {
	const [visible, setVisible] = useVisible(propVisible, onChangeVisible)

	return (
		<ModalWrap visible={visible} setVisible={setVisible}>
			<div className="relative text-center">
				<div className="bg-white" style={{ width: 360, height: 360 }}></div>
				<div className="text-white mt-12">請照順序滑動解鎖</div>
			</div>
		</ModalWrap>
	)
}

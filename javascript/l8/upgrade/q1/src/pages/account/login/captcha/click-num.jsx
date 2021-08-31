import { useVisible } from '@/hooks/use-visible'
import { ModalWrap } from '@/pages/account/login/captcha/modal-wrap'

export const ClickNumCaptcha = ({
	visible: propVisible,
	onChangeVisible,
	onLogin,
}) => {
	const [visible, setVisible] = useVisible(propVisible, onChangeVisible)

	return (
		<ModalWrap visible={visible} setVisible={setVisible}>
			PatternCaptcha
		</ModalWrap>
	)
}

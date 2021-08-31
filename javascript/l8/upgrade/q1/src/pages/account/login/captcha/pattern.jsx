import { useState } from 'react'
import { useVisible } from '@/hooks/use-visible'
import ReactDOM from 'react-dom'
import { ModalWrap } from '@/pages/account/login/captcha/modal-wrap'

export const PatternCaptcha = ({
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

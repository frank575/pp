import { useVisible } from '@/hooks/use-visible'
import { ModalWrap } from '@/pages/account/login/captcha/modal-wrap'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createMessage } from '@/lib/create-message'

const DOT_NUM = 3
const DOT_SIZE = 60
const BOARD_WIDTH = 450
const BOARD_HEIGHT = 300

export const ClickNumCaptcha = ({
	visible: propVisible,
	onChangeVisible,
	onLogin,
}) => {
	const [visible, setVisible] = useVisible(propVisible, onChangeVisible)
	const [isSmall, setIsSmall] = useState(true)
	const [answers, setAnswers] = useState([])
	const [questions, setQuestions] = useState([])
	const title = useMemo(() => {
		const [b, a] = isSmall ? '小大' : '大小'
		return `請由數字最${b}點到最${a}`
	}, [isSmall])

	const onClickDot = (num, i) => {
		const _answers = [...answers, num]
		setAnswers(_answers)
		setQuestions(e => e.slice(0, i).concat(e.slice(i + 1)))
		if (_answers.length === DOT_NUM) {
			validate(_answers)
		}
	}

	const createRandomWithDotNum = useCallback(() => {
		const randoms = []
		for (let i = 0; i < DOT_NUM; i++) {
			let resetTime = 0
			let num = Math.floor(Math.random() * 98) + 1
			while (randoms.some(n => n === num)) {
				if (resetTime >= 6) break
				num = Math.floor(Math.random() * 98 + 1)
				resetTime++
			}
			randoms.push(num)
		}
		return randoms
	}, [])

	const initDot = useCallback(() => {
		const questions = []
		const randoms = createRandomWithDotNum()
		let resetTime = 0
		let i = 0
		while (questions.length < DOT_NUM) {
			let x = Math.floor(Math.random() * BOARD_WIDTH - DOT_SIZE)
			let y = Math.floor(Math.random() * BOARD_HEIGHT - DOT_SIZE)
			if (x < 0) x = 0
			if (y < 0) y = 0

			if (resetTime < DOT_NUM * 2) {
				if (
					questions.some(([qx, qy, qnum]) => {
						const ex = x + DOT_SIZE
						const ey = y + DOT_SIZE
						const eqx = qx + DOT_SIZE
						const eqy = qy + DOT_SIZE
						return (
							(x < qx ? ex > qx && ex < eqx : x < eqx) &&
							(y < qy ? ey > qy && ey < eqy : y < eqy)
						)
					})
				) {
					resetTime++
					continue
				}
			} else {
				resetTime = 0
			}

			questions.push([x, y, randoms[i]])
			i++
		}
		setQuestions(questions)
		setIsSmall(Math.random() < 0.5)
		setAnswers([])
	}, [setQuestions, setAnswers])

	const validate = useCallback(
		async (answers = []) => {
			let pass = true
			for (let i = 0; i < answers.length - 1; i++) {
				const curr = answers[i]
				const next = answers[i + 1]
				if (isSmall) {
					if (curr > next) {
						pass = false
						break
					}
				} else {
					if (curr < next) {
						pass = false
						break
					}
				}
			}
			if (pass) {
				const res = await onLogin?.()
				if (res && res.data.success) return
			} else {
				createMessage('驗證失敗，請點選正確數字', 'danger')
			}
			return initDot()
		},
		[isSmall, onLogin, initDot],
	)

	useEffect(() => {
		if (visible) {
			initDot()
		}
	}, [visible])

	return (
		<ModalWrap visible={visible} setVisible={setVisible}>
			<div className="relative text-center">
				<div
					className="bg-white relative"
					style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT }}
				>
					{questions.map(([x, y, num], i) => (
						<div
							key={`x${x}y${y}num${num}`}
							className="flex items-center justify-center absolute border-solid border-1 border-black rounded-full cursor-pointer"
							style={{ width: DOT_SIZE, height: DOT_SIZE, left: x, top: y }}
							onClick={() => onClickDot(num, i)}
						>
							{num}
						</div>
					))}
				</div>
				{answers.length ? (
					<div className="text-white mt-5 text-lg">{answers.join('、')}</div>
				) : null}
				<div className="text-white mt-5">{title}</div>
			</div>
		</ModalWrap>
	)
}

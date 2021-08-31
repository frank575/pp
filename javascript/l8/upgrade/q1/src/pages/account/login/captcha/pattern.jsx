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

const SIZE = 3
const dots = Array(SIZE).fill(Array(SIZE).fill(null))
const questions = []

const getValidLocals = ([x, y]) => {
	if (x > SIZE || y > SIZE) return []

	const validLocals = []
	// 左右
	if (x + 1 < SIZE) validLocals.push([x + 1, y])
	if (x - 1 > -1) validLocals.push([x - 1, y])

	// 上下
	if (y + 1 < SIZE) validLocals.push([x, y + 1])
	if (y - 1 > -1) validLocals.push([x, y - 1])

	// 斜
	const ty = y - 1
	const by = y + 1
	const lx = x - 1
	const rx = x + 1
	if (ty >= 0) {
		if (lx >= 0) validLocals.push([lx, ty])
		if (rx < SIZE) validLocals.push([rx, ty])
	}
	if (by < SIZE) {
		if (lx >= 0) validLocals.push([lx, by])
		if (rx < SIZE) validLocals.push([rx, by])
	}

	return validLocals
}

const init = () => {
	const _questions = []
	let pos = [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)]
	let i = 0
	let pass = { x: {}, y: {} }
	console.log(pos)
	while (i < 8) {
		const validLocals = getValidLocals(pos)
		if (validLocals.length === 0) break

		const filterValidLocals = validLocals.filter(
			([vx, vy]) => pass.x[vx] == null && pass.y[vy] == null,
		)
		const next = validLocals.filter(
			([vx, vy]) => pass.x[vx] == null && pass.y[vy] == null,
		)[Math.floor(Math.random() * filterValidLocals.length)]
		if (next == null) break

		pass.x[next[0]] = 1
		pass.y[next[1]] = 1
		_questions.push(next)
		pos = next
		i++
	}
	console.log(_questions)
}
init()

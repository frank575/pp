import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { createClassName } from '@jsl'

const Content = ({
	visible = false,
	maskCloseable = true,
	onCancel: onPropCancel,
	children,
}) => {
	const onCancel = () => onPropCancel?.()

	return ReactDOM.createPortal(
		<div className="relative">
			<div
				className="fixed left-0 top-0 right-0 bottom-0 bg-black opacity-70"
				onClick={() => maskCloseable && onCancel()}
			/>
			<div className="fixed left-0 top-0 right-0 bottom-0 overflow-y-auto">
				<div className="p-6 flex min-h-screen justify-center items-center">
					<div
						className={createClassName({
							'bg-white rounded-xl p-4': true,
							'ani-slide-in': visible,
							'ani-slide-out': !visible,
						})}
					>
						<div className="text-right mb-2">
							<i
								className="fas fa-times text-xl cursor-pointer"
								onClick={onCancel}
							/>
						</div>
						{children}
					</div>
				</div>
			</div>
		</div>,
		document.getElementById('modal-root'),
	)
}

export const Modal = ({
	visible = false,
	maskCloseable = true,
	onCancel: onPropCancel,
	children,
}) => {
	return (
		<CSSTransition in={visible} timeout={200} classNames="fade" unmountOnExit>
			<Content
				visible={visible}
				maskCloseable={maskCloseable}
				onCancel={onPropCancel}
			>
				{children}
			</Content>
		</CSSTransition>
	)
}

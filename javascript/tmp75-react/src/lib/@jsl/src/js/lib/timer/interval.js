/// setInterval 封裝
/// author frank575
/// v0


const start = state => (fun, delay = 0) => {
	stop(state)()
	state.timer = setInterval(() => fun(), delay)
}

const stop = state => () => {
	if (state.timer != null) {
		clearInterval(state.timer)
		state.timer = null
	}
}

/**
 * @template T
 * @returns {{stop: function(): void, start: function(fun: function(): void, delay: number = 0): void}}
 */
export const interval = () => {
	const state = { timer: null }
	return {
		start: start(state),
		stop: stop(state),
	}
}

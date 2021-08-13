/// 數字加逗號，step(參數2)為多少位加逗號，預設千非位
/// v0 {author: frank575}

export const stepPrice = (() => {
	const ds = {} as { [n: number]: string }
	const createStepD = (step: number) =>
		(ds[step] = Array.from(new Array(step), (_, i) => i).reduce(
			p => p + '\\d',
			'',
		))
	return (price: number | string, step = 3): string => {
		let _price = price as number | string

		if (typeof price === 'number') _price = String(price)

		if (typeof _price === 'string') {
			const stepD = ds[step] || createStepD(step)
			_price = _price.replace(
				new RegExp(`(\\d)(?=(${stepD})+(?!\\d))`, 'g'),
				'$1,',
			)
		}

		return _price as string
	}
})()

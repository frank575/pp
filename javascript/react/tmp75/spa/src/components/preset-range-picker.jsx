import React from 'react'
import { DatePicker } from 'antd'
import { useCommonSelectState } from '@/hooks/use-common-select-state'
import { createClassName, mtime } from '@jsl'

const { RangePicker } = DatePicker
export const PresetRangePicker = ({
	className,
	defaultValue,
	value,
	onChange,
	...args
}) => {
	const [v, _onChange] = useCommonSelectState({
		value,
		onChange,
		defaultValue,
	})
	const ranges = {
		今天: mtime.today(),
		昨天: mtime.yesterday(),
		過去七天: mtime.pastWeek(),
		過去一個月: mtime.pastMonth(),
	}

	return (
		<RangePicker
			className={createClassName({
				[className]: className != null,
			})}
			ranges={ranges}
			value={v}
			onChange={_onChange}
			{...args}
		/>
	)
}

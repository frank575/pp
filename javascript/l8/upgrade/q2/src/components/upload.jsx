import { Button } from '@/components/button'
import { useRef } from 'react'
import { createClassName } from '@jsl'

export const Upload = ({ className, onChange: onPropChange }) => {
	const fileRef = useRef(null)
	const onUpload = () => fileRef.current?.click()
	const onChange = ev => onPropChange?.(ev.target.files[0])

	return (
		<div
			className={createClassName({
				[className]: className != null,
			})}
		>
			<Button onClick={onUpload}>上傳</Button>
			<input className="hidden" ref={fileRef} type="file" onChange={onChange} />
		</div>
	)
}

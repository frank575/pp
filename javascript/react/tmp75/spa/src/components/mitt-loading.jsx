import { useState } from 'react'
import { useMitt } from '@/core/hooks/use-mitt'

export const MittLoading = ({ type = '', render }) => {
	const [loading, setLoading] = useState(false)
	const { on } = useMitt()
	on(type, _loading => setLoading(_loading))
	return render ? render(loading) : null
}

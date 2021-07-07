/// 更新頁籤 title
/// v0 {author: frank575}

import { useEffect, useRef } from 'react'

export const useTitle = (title, restoreOnUnmount = false) => {
	const prevTitleRef = useRef(document.title)
	document.title = title
	useEffect(() => {
		if (restoreOnUnmount) {
			return () => {
				document.title = prevTitleRef.current
			}
		}
	}, [])
}

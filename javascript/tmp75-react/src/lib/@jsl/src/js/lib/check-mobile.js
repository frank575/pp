/// 檢測是否是 Mobile
/// v0 {author: frank575}

/**
 * @returns {boolean}
 */
export const checkMobile = () => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent,
	)
}

/// 檢測是否是 Mobile
/// author frank575
/// v0


/**
 * @returns {boolean}
 */
export const checkMobile = () => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent,
	)
}

/// 下載 blob File
/// v1 {author: frank575} 由 ts 重寫類型
/// v0 {author: frank575}

export const downloadBlob = (blob, fileName, fileType) => {
	const url = window.URL.createObjectURL(new Blob([blob]))
	const link = document.createElement('a')
	link.style.display = 'none'
	link.href = url
	link.setAttribute('download', `${fileName}.${fileType}`)
	document.body.appendChild(link)
	link.click()
}

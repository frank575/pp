import { PageContent } from '@/components/page-content'
import { Upload } from '@/components/upload'
import { SplitPicture } from '@/components/split-picture'
import { useAuthHttp } from '@/core/hooks/http/use-auth-http'
import { useState } from 'react'
import { createMessage } from '@/lib/create-message'

export default () => {
	const { _http } = useAuthHttp()
	const [uploadImgSrc, setUploadImgSrc] = useState(null)
	const onSendUploadPicture = file => {
		if (file) {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => setUploadImgSrc(reader.result)
		}
	}
	const onUpdateUserHeadPicture = async blob => {
		const formData = new FormData()
		formData.append('image', blob, 'head.png')
		const res = await _http.post('/users/uploadPicture', formData)
		if (res.data.success) createMessage('上傳使用者圖片成功')
	}

	return (
		<PageContent>
			<div className="text-2xl">帳戶設定</div>
			<Upload onChange={onSendUploadPicture} />
			<SplitPicture
				type={'blob'}
				src={uploadImgSrc}
				onSplit={onUpdateUserHeadPicture}
			/>
		</PageContent>
	)
}

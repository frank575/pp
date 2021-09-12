import { PageContent } from '@/components/page-content'
import { Upload } from '@/components/upload'
import { SplitPicture } from '@/components/split-picture'
import { useAuthHttp } from '@/core/hooks/http/use-auth-http'
import { useState } from 'react'
import { createMessage } from '@/lib/create-message'
import { useAuth } from '@/core/hooks/use-auth'

export default () => {
	const { _http } = useAuthHttp()
	const auth = useAuth(e => e.auth)
	const setAuth = useAuth(e => e.setAuth)
	const [uploadImgSrc, setUploadImgSrc] = useState(null)
	const [submitLoading, setSubmitLoading] = useState(false)
	const onSendUploadPicture = file => {
		if (file) {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => setUploadImgSrc(reader.result)
		}
	}
	const onUpdateUserHeadPicture = async blob => {
		setSubmitLoading(true)
		const formData = new FormData()
		formData.append('image', blob, 'head.png')
		const res = await _http.post('/users/uploadPicture', formData)
		setSubmitLoading(false)
		if (res.data.success) {
			createMessage('上傳使用者圖片成功')
			setAuth(e => ({ ...e, imgLink: res.data.data }))
		}
	}

	return (
		<PageContent>
			<div className="text-2xl">帳戶設定</div>
			{auth != null && (
				<img
					className="mt-2"
					style={{ maxWidth: 120 }}
					src={auth.imgLink}
					alt=""
				/>
			)}
			<Upload
				className="mt-2"
				onChange={onSendUploadPicture}
				loading={submitLoading}
			/>
			<SplitPicture
				type={'blob'}
				src={uploadImgSrc}
				onSplit={onUpdateUserHeadPicture}
			/>
		</PageContent>
	)
}

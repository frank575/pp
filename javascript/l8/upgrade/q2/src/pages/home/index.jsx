import { PageContent } from '@/components/page-content'
import { SplitPicture } from '@/components/split-picture'

export default () => {
	return (
		<PageContent>
			<div>首頁</div>
			<SplitPicture
				src={
					'https://img.freepik.com/free-photo/little-chihuahua-dog-posing-like-christmas-deer-isolated-white-background_155003-24226.jpg?size=626&ext=jpg&ga=GA1.2.1611205989.1630800000'
				}
				onSplit={base64 =>
					console.log(base64.replace('data:image/png;base64,', ''))
				}
			/>
		</PageContent>
	)
}

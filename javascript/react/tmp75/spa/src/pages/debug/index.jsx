import { PageContent } from '@/components/page-content'
import { PageTitle } from '@/components/page-title'
import { BugOutlined } from '@ant-design/icons'

export default () => {
	return (
		<PageContent>
			<PageTitle title={'開發調適'} icon={BugOutlined} just />
		</PageContent>
	)
}

import { useNewsService } from '@/pages/news/useNewsService'
import { AppContent } from '@/components/app-content'

export default () => {
	const newsService = useNewsService()

	return <AppContent>news</AppContent>
}

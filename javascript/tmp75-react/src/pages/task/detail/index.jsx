import { useTaskDetailService } from '@/pages/task/detail/useTaskDetailService'
import { AppContent } from '@/components/app-content'

export default () => {
	const taskDetailService = useTaskDetailService()

	return <AppContent>task/detail</AppContent>
}

import { useTaskListService } from '@/pages/task/list/useTaskListService'
import { AppContent } from '@/components/app-content'

export default () => {
	const taskListService = useTaskListService()

	return <AppContent>task/list</AppContent>
}

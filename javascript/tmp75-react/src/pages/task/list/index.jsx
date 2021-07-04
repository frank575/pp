import { useTaskListService } from '@/pages/task/list/useTaskListService'
import { MyAppContent } from '@/components/my-app-content'

export default () => {
	const taskListService = useTaskListService()

	return <MyAppContent>task/list</MyAppContent>
}

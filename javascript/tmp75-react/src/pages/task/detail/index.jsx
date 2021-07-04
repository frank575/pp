import { useTaskDetailService } from '@/pages/task/detail/useTaskDetailService'
import { MyAppContent } from '@/components/my-app-content'

export default () => {
	const taskDetailService = useTaskDetailService()

	return <MyAppContent>task/detail</MyAppContent>
}

import { Breadcrumb } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'

export const GoBackBreadcrumbItem = ({ children }) => {
	const history = useHistory()

	return (
		<Breadcrumb.Item>
			<a className="text-primary" onClick={() => history.goBack()}>
				{children}
			</a>
		</Breadcrumb.Item>
	)
}

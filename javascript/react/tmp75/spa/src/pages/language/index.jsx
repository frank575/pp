import React from 'react'
import { AppContent } from '@/components/app/content'
import { AppTitle } from '@/components/app/title'
import { TranslationOutlined } from '@ant-design/icons'
import { Form, Select } from 'antd'
import { ELocale } from '@/enums/e-locale'
import { useI18n } from '@i18n'

export default () => {
	const { locale, changeLocale, t } = useI18n(e => e)
	const onChangeLocale = _locale => changeLocale(_locale)

	return (
		<AppContent>
			<AppTitle title={'多國語系'} icon={TranslationOutlined} just />
			<Form.Item label="當前語系" className="mb-2">
				<Select value={locale} onChange={onChangeLocale}>
					{ELocale.map(([v, t]) => (
						<Select.Option key={v} value={v}>
							{t}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item label="示範單字" className="mb-0">
				{t('handsomeX', ['Frank'])}
			</Form.Item>
		</AppContent>
	)
}

import React from 'react'
import { AppContent } from '@/components/app/content'
import { AppTitle } from '@/components/app/title'
import { TranslationOutlined } from '@ant-design/icons'
import { Form, message, Select } from 'antd'
import { ELocale } from '@/enums/e-locale'
import { t, useI18n } from '@i18n'

const callSuccessMessage = () => {
	// 也可以從 @i18n 內取出 t 方法進行翻譯，支援任意位置調用
	// 如果要刷新頁面請使用 useI18n 取出 t
	message.success(t('changeMessageSuccess'))
}

export default () => {
	const { locale, changeLocale, t } = useI18n(e => e)
	const onChangeLocale = _locale => {
		changeLocale(_locale)
		callSuccessMessage()
	}

	return (
		<AppContent>
			<AppTitle title={'多國語系'} icon={TranslationOutlined} just />
			<Form.Item label="當前語系" className="mb-2">
				<Select value={locale} onChange={onChangeLocale}>
					{ELocale.map(e => (
						<Select.Option key={e} value={e}>
							{ELocale.t(e)}
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

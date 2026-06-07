import React from 'react';
import { useTranslation } from 'react-i18next';

const Settings: React.FC = () => {
	const { t } = useTranslation();

	return <div>{t('settings.title')}</div>;
};

export default Settings;

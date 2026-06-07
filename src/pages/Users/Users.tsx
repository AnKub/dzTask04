import React from 'react';
import { useTranslation } from 'react-i18next';

const Users: React.FC = () => {
	const { t } = useTranslation();

	return <div>{t('users.title')}</div>;
};

export default Users;

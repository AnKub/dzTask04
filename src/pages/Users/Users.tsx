import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { users } from '../../mock/users';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUsers } from '../../store/usersSlice';
import './Users.scss';

const Users: React.FC =()=> {
const dispatch = useAppDispatch();
const usersList = useAppSelector((state) => state.users.items);
const { t } = useTranslation();

	useEffect(() => {
		dispatch(setUsers(users));
	}, [dispatch]);

return (
  <section className="users-page">
    <div className="users-page__header">
      <h1>{t('users.title')}</h1>
      <span>{usersList.length}</span>
    </div>

    <div className="users-page__list">
      {usersList.map((user) => (
        <article className="users-page__item" key={user.id}>
          <div className="users-page__avatar">
            {user.name.charAt(0)}
          </div>

          <div className="users-page__identity">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>

          <div className="users-page__meta">
            <span>{user.role}</span>
            <span>{user.status}</span>
          </div>
        </article>
      ))}
    </div>
  </section>
);
};

export default Users;

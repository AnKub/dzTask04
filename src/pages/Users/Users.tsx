import React, { useEffect,  useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { users } from '../../mock/users';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUsers } from '../../store/usersSlice';
import './Users.scss';

const Users: React.FC =()=> {
const dispatch = useAppDispatch();
const usersList = useAppSelector((state) => state.users.items);
const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
const [searchQuery, setSearchQuery] = useState('');
const { t } = useTranslation();
const selectedUser = usersList.find((user) => user.id === selectedUserId) ?? null;

const filteredUsers = useMemo(()=>{
  const normalizedQuery = searchQuery.trim().toLowerCase();
  if(!normalizedQuery) {
    return usersList;
  }
 return usersList.filter((user) => {
    const searchableText = `${user.name} ${user.email}`.toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}, [searchQuery, usersList]);

	useEffect(() => {
		dispatch(setUsers(users));
	}, [dispatch]);

return (
  <section className="users-page">
    <div className="users-page__header">
      <h1>{t('users.title')}</h1>
      <span>{usersList.length}</span>
    </div>

  <div className="users-page__workspace">
  <div className="users-page__list">
    {usersList.map((user) => (
      <button
        className={`users-page__item${user.id === selectedUserId ? ' users-page__item--selected' : ''}`}
        type="button"
        key={user.id}
        onClick={() => setSelectedUserId(user.id)}
      >
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
      </button>
    ))}
  </div>

  {selectedUser ? (
    <aside className="users-page__details">
      <div className="users-page__details-avatar">
        {selectedUser.name.charAt(0)}
      </div>

      <h2>{selectedUser.name}</h2>
      <p className="users-page__details-email">{selectedUser.email}</p>

      <dl className="users-page__details-list">
        <div>
          <dt>Роль</dt>
          <dd>{selectedUser.role}</dd>
        </div>

        <div>
          <dt>Статус</dt>
          <dd>{selectedUser.status}</dd>
        </div>

        <div>
          <dt>Останній вхід</dt>
          <dd>{selectedUser.lastLogin}</dd>
        </div>

        <div>
          <dt>Створено</dt>
          <dd>{selectedUser.createdAt}</dd>
        </div>
      </dl>
    </aside>
  ) : (
    <aside className="users-page__details users-page__details--empty">
      <p>Оберіть користувача зі списку</p>
    </aside>
  )}
</div>
  </section>
);
};

export default Users;

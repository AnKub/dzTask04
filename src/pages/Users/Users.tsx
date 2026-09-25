import React, { useEffect,  useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { UserRole, UserStatus } from '../../types/user';
import { users } from '../../mock/users';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUsers } from '../../store/usersSlice';
import './Users.scss';

const Users: React.FC =()=> {
const dispatch = useAppDispatch();
const usersList = useAppSelector((state) => state.users.items);
const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
const [searchQuery, setSearchQuery] = useState('');
const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
const { t } = useTranslation();


const filteredUsers = useMemo(() => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return usersList.filter((user) => {
    const searchableText = `${user.name} ${user.email}`.toLowerCase();
    const matchesSearch = searchableText.includes(normalizedQuery);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });
}, [roleFilter, searchQuery, statusFilter, usersList]);

const selectedUser = filteredUsers.find((user) => user.id === selectedUserId) ?? null;
	useEffect(() => {
		dispatch(setUsers(users));
	}, [dispatch]);

return (
  <section className="users-page">
    <div className="users-page__header">
      <h1>{t('users.title')}</h1>
    <div className="users-page__header-actions">
    <input
      className="users-page__search"
      type="search"
      value={searchQuery}
      onChange={(event) => setSearchQuery(event.target.value)}
     placeholder={t('users.searchPlaceholder')}
aria-label={t('users.searchPlaceholder')}
    />
    <select
  className="users-page__filter"
  value={roleFilter}
  onChange={(event) => setRoleFilter(event.target.value as UserRole | 'all')}
  aria-label={t('users.roleFilterLabel')}
>
  <option value="all">{t('users.allRoles')}</option>
  <option value="admin">{t('users.roles.admin')}</option>
  <option value="manager">{t('users.roles.manager')}</option>
  <option value="editor">{t('users.roles.editor')}</option>
  <option value="user">{t('users.roles.user')}</option>
</select>
<select
  className="users-page__filter"
  value={statusFilter}
  onChange={(event) => setStatusFilter(event.target.value as UserStatus | 'all')}
  aria-label={t('users.statusFilterLabel')}
>
  <option value="all">{t('users.allStatuses')}</option>
  <option value="active">{t('users.statuses.active')}</option>
  <option value="inactive">{t('users.statuses.inactive')}</option>
  <option value="banned">{t('users.statuses.banned')}</option>
</select>

    <span>{filteredUsers.length}</span>
  </div>
    </div>

  <div className="users-page__workspace">
  <div className="users-page__list">
    {filteredUsers.map((user) => (
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

import type { User } from '../types/user';

export const users: User[] = [
  {
    id: '1',
    name: 'Olena Ivanova',
    email: 'olena@company.com',
    role: 'admin',
    status: 'active',
    avatarUrl: '',
    lastLogin: '2026-06-24 14:22',
    createdAt: '2025-11-01',
  },
  {
    id: '2',
    name: 'Mykhailo Petrov',
    email: 'mykhailo@company.com',
    role: 'manager',
    status: 'active',
    avatarUrl: '',
    lastLogin: '2026-06-25 09:10',
    createdAt: '2026-01-12',
  },
  {
    id: '3',
    name: 'Anna Koval',
    email: 'anna@company.com',
    role: 'editor',
    status: 'inactive',
    avatarUrl: '',
    lastLogin: '2026-06-20 16:45',
    createdAt: '2026-02-18',
  },
];
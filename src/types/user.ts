export type UserRole = 'admin' | 'user' | 'manager' | 'editor';
export type UserStatus = 'active' | 'inactive' | 'banned';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatarUrl: string;   
  lastLogin: string;   
  createdAt: string;
  updatedAt?: string;  
}

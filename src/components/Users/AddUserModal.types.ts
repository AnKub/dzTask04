import type {UserRole, UserStatus} from '../../types/user';

export interface AddUserFormValues{
  name:string;
  email:string;
  role: UserRole;
  status: UserStatus;
}
export type AddUserFormErrors = Partial<
  Record<keyof AddUserFormValues, string>
>;

export const initialAddUserFormValues: AddUserFormValues = {
  name: '',
  email: '',
  role: 'user',
  status:'active',
};
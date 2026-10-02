import type { User } from '../../types/user';
import type { AddUserFormErrors, AddUserFormValues } from './AddUserModal.types';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateAddUserForm = (
  values: AddUserFormValues,
  existingUsers: User[]
): AddUserFormErrors => {
  const errors: AddUserFormErrors = {};
  const normalizedName = values.name.trim();
  const normalizedEmail = values.email.trim().toLowerCase();

  if (normalizedName.length < 2) {
    errors.name = 'users.validation.nameMin';
  }

  if (!normalizedEmail) {
    errors.email = 'users.validation.emailRequired';
  } else if (!emailPattern.test(normalizedEmail)) {
    errors.email = 'users.validation.emailInvalid';
  } else {
    const emailAlreadyExists = existingUsers.some(
      (user) => user.email.trim().toLowerCase() === normalizedEmail
    );

    if (emailAlreadyExists) {
      errors.email = 'users.validation.emailTaken';
    }
  }

  return errors;
};
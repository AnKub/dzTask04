import React, { useMemo, useState } from 'react';
import type { User } from '../../types/user';
import type {
  AddUserFormErrors,
  AddUserFormValues,
} from './AddUserModal.types';
import { initialAddUserFormValues } from './AddUserModal.types';
import { validateAddUserForm } from './AddUserModal.validation';
import './AddUserModal.scss';

interface AddUserModalProps {
  open: boolean;
  existingUsers: User[];
  onClose: () => void;
  onSubmit: (values: AddUserFormValues) => void;
}
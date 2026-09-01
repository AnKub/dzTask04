import { users } from '../mock/users';
import type { User } from '../types/user';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const usersDataService = {
  async getUsers(): Promise<User[]> {
    await delay(150);
    return clone(users);
  },

  async getUserById(id: string): Promise<User | undefined> {
    await delay(100);
    return clone(users.find((user) => user.id === id));
  },

  async updateUser(updatedUser: User): Promise<User> {
    await delay(120);
    const index = users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      users[index] = { ...updatedUser };
    }
    return clone(updatedUser);
  },

  async createUser(user: User): Promise<User> {
    await delay(120);
    users.push(user);
    return clone(user);
  },
};

export default usersDataService;
import { makeAutoObservable } from 'mobx';
import { type IUser } from '../../types';
import { api, urls } from '../../api';

class UsersStore {
  users: Array<IUser> | null = null;
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetch = async () => {
    const { data } = await api.get<Array<IUser>>(urls.users.get);

    this.users = data;
  };

  updateUser = async (text: string) => {
    await api.patch<IUser>(`${urls.user.patch}/${this.user?.id}`, { description: text });
    await this.fetch();
  };

  saveUser = (user: IUser) => this.user = user;

  getError = async () => api.get(urls.error.get);
}

export const usersStore = new UsersStore();

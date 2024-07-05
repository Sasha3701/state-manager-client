import { atom } from 'jotai';
import { type IUser } from '../../types';
import { api, urls } from '../../api';

const usersAtom = atom<Array<IUser> | null>(null);

export const users = atom(get => get(usersAtom));

export const fetchUsers = atom(null, async (_, set) => {
    const { data } = await api.get<Array<IUser>>(urls.users.get);
    set(usersAtom, data);
});

export const updateUser = atom(null, async (_, set, id: number, body: Partial<IUser>) => {
    await api.patch<IUser>(`${urls.user.patch}/${id}`, body);
    const { data } = await api.get<Array<IUser>>(urls.users.get);
    set(usersAtom, data);
});

export const getError = atom(null, async () => api.get(urls.error.get));

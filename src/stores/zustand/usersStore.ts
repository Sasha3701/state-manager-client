import { create } from 'zustand'
import { type IUser } from '../../types';
import { api, urls } from '../../api';

interface IState {
    users: Array<IUser> | null;
    isLoading: boolean;
    fetch: () => Promise<void>;
    updateUser: (id: number, data: Partial<IUser>) => Promise<void>;
    getError: () => Promise<void>;
}

export const useUsers = create<IState>((set, get) => ({
    users: null,
    isLoading: false,
    fetch: async () => {
        try {
            set({ isLoading: true });
            const { data } = await api.get<Array<IUser>>(urls.users.get);
            set({ users: data });
        } catch(e) {
            throw new Error();
        } finally {
            set({ isLoading: false });
        }
    },
    updateUser: async (id, data) => {
        await api.patch<IUser>(`${urls.user.patch}/${id}`, data);
        await get().fetch();
    },
    getError: async () => api.get(urls.error.get),
}));

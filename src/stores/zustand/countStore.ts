import { create } from 'zustand'

interface IState {
    count: number;
    updateCount: () => void;
}

export const useCount = create<IState>((set) => ({
    count: 0,
    updateCount: () => set(state => ({ count: ++state.count })),
}));

import { atom } from 'jotai';

const count = atom(0);

export const countAtom = atom(
    get => get(count),
    (get, set) => set(count, get(count) + 1),
);

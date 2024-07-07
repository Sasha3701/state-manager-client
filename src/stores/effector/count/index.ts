import { createEvent, createStore } from "effector";

export const incrementClicked = createEvent();
export const $count = createStore(0);

$count.on(incrementClicked, (count) => count + 1);

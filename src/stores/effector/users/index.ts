import { createEffect, createEvent, createStore, restore, sample } from "effector";
import { api, urls } from "../../../api";
import { type IUser } from "../../../types";

// Users
export const getUsersFx = createEffect(async () => {
    const { data } = await api.get<Array<IUser>>(urls.users.get);
    return data;
});

export const $users = restore(getUsersFx, null);
//



// Modal
export const $modal = createStore(false);
export const modalClosed = createEvent();
export const modalOpened = createEvent();

$modal.on(modalOpened, () => true);
$modal.on(modalClosed, () => false);
//



// Description
export const $description = createStore('');
export const descriptionChanged = createEvent<string>();

$description.on(descriptionChanged, (_, str) => str);
//



// User
export const updateUserFx = createEffect(async ({ user, description }: { user: IUser; description: string }) => {
    await api.patch<IUser>(`${urls.user.patch}/${user.id}`, { description});
    const { data } = await api.get<Array<IUser>>(urls.users.get);
    return data;
});

export const $user = createStore<IUser | null>(null);
export const userSaved = createEvent<IUser>();
export const userUpdated = createEvent();

$user.on(userSaved, (_, user) => user);
$users.on(updateUserFx.doneData, (_, users) => users);

sample({
    clock: userUpdated,
    source: [$user, $description],
    fn: params => {
        const [userUnknown, descriptionUnknown] = params;

        return { user: userUnknown as IUser, description: descriptionUnknown as string };
    },
    target: updateUserFx,
});
//

// Error
export const errorFx = createEffect(async () => api.get(urls.error.get));
export const errorTrigged = createEvent();

sample({
    clock: errorTrigged,
    target: errorFx,
});
//

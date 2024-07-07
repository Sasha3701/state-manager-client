import { useEffect } from "react";
import { Card, List as AntdList, Skeleton, Modal, message, Input } from "antd";
import { useUnit } from "effector-react";
import { $modal, $users, modalClosed, getUsersFx, modalOpened, userSaved, updateUserFx, userUpdated, $description, descriptionChanged } from "../../../../stores/effector/users";
import { type IUser } from "../../../../types";

export const List = () => {
    const [
        fetchUsers,
        confirmLoading,
        onUpdateUser,
        onCloseModal,
        onOpenModal,
        onSaveUser,
        onChangeDescription,
        users,
        isLoading,
        modal,
        description,
    ] = useUnit([
        getUsersFx,
        updateUserFx.pending,
        userUpdated,
        modalClosed,
        modalOpened,
        userSaved,
        descriptionChanged,
        $users,
        getUsersFx.pending,
        $modal,
        $description,
    ]);

    const [messageApi, contextHolder] = message.useMessage({
        top: 100,
    });

    useEffect(() => {
        if (!users) {
            fetchUsers();
        }
    }, []);

    const handleOpenModal = (user: IUser) => {
        onOpenModal();
        onSaveUser(user);
    };
    const handleCancel = () => onCloseModal();

    const handleOk = async () => {
        onUpdateUser();

        updateUserFx.done.watch(() => {
            messageApi.success({
                content: 'Success update',
            })
            onCloseModal();
        });

        updateUserFx.fail.watch(() => {
            messageApi.error({
                content: 'Error update',
            })
            onCloseModal();
        });

        updateUserFx.finally.watch(() => {
            onCloseModal();
        });
      };

    return (
        <>
            {!users || isLoading ? (
                <Skeleton active />
            ) : (
                <Card title="List">
                    <AntdList
                        bordered
                        dataSource={users}
                        renderItem={user => (
                            <AntdList.Item style={{ cursor: 'pointer' }} onClick={() => handleOpenModal(user)}>
                                <span>id: {user.id}</span>
                                <span>name: {user.name}</span>
                                <span>surname: {user.surname}</span>
                                <span>age: {user.age}</span>
                                <span>description: {user.description}</span>
                            </AntdList.Item>
                        )}
                    />
                </Card>
            )}

            <Modal
                title="Change user"
                open={modal}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>
                    <label htmlFor="change-description">To change description:</label>
                    <Input
                        id="change-description"
                        value={description}
                        onChange={e => onChangeDescription(e.target.value)}
                    />
                </p>
            </Modal>
            {contextHolder}
        </>
    );
};

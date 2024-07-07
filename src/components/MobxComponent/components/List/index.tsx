import { useEffect, useRef, useState } from "react";
import { Card, List as AntdList, Skeleton, Modal, message, Input, type InputRef } from "antd";
import { observer } from "mobx-react-lite";
import { usersStore } from "../../../../stores/mobx";
import { type IUser } from "../../../../types";

export const List = observer(() => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const inputRef = useRef<InputRef>(null);

    const [messageApi, contextHolder] = message.useMessage({
        top: 100,
    });

    useEffect(() => {
        if (!usersStore.users) {
            usersStore.fetch();
        }
    }, []);

    const handleOpenModal = (user: IUser) => {
        usersStore.saveUser(user);
        setOpen(true);
    };
    const handleCancel = () => setOpen(false);

    const handleOk = async () => {
        try {
            setConfirmLoading(true);
            await usersStore.updateUser(inputRef.current?.input?.value as string);
            messageApi.success({
                content: 'Success update',
            })
        } catch(e) {
            messageApi.error({
                content: 'Error',
            })
        } finally {
            setConfirmLoading(false);
            setOpen(false);
        }
      };

    return (
        <>
            {!usersStore.users ? (
                <Skeleton active />
            ) : (
                <Card title="List">
                    <AntdList
                        bordered
                        dataSource={usersStore.users}
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
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>
                    <label htmlFor="change-description">To change description:</label>
                    <Input id="change-description" ref={inputRef} />
                </p>
            </Modal>
            {contextHolder}
        </>
    );
});

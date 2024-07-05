import { useEffect, useRef, useState } from "react";
import { Card, List as AntdList, Skeleton, Modal, message, Input, type InputRef } from "antd";
import { useAtom } from 'jotai';
import { fetchUsers, updateUser, users } from "../../../../stores/jotai";

export const List = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const userIdRef = useRef<number>();
    const inputRef = useRef<InputRef>(null);

    const [messageApi, contextHolder] = message.useMessage({
        top: 100,
    });

    const [list] = useAtom(users);
    const [, handlefetch] = useAtom(fetchUsers);
    const [, handleUpdateUser] = useAtom(updateUser);

    useEffect(() => {
        if (!list) {
            handlefetch();
        }
    }, []);

    const handleOpenModal = (id: number) => {
        userIdRef.current = id;
        setOpen(true);
    };
    const handleCancel = () => setOpen(false);

    const handleOk = async () => {
        try {
            setConfirmLoading(true);
            await handleUpdateUser(userIdRef.current as number, { description: inputRef.current?.input?.value });
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
            {!list ? (
                <Skeleton active />
            ) : (
                <Card title="List">
                    <AntdList
                        bordered
                        dataSource={list}
                        renderItem={({ age, description, id, name, surname }) => (
                            <AntdList.Item style={{ cursor: 'pointer' }} onClick={() => handleOpenModal(id)}>
                                <span>id: {id}</span>
                                <span>name: {name}</span>
                                <span>surname: {surname}</span>
                                <span>age: {age}</span>
                                <span>description: {description}</span>
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
};

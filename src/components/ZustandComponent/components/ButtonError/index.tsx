import { Button, message } from "antd";
import { useUsers } from "../../../../stores/zustand";

export const ButtonError = () => {
    const [messageApi, contextHolder] = message.useMessage({
        top: 100,
    });

    const getError = useUsers(state => state.getError);

    const handleError = async () => {
        try {
            await getError();
        } catch(e) {
            messageApi.error({
                content: 'Error',
            })
        } 
    };

    return (
        <div className="button-error">
            <Button type="primary" onClick={handleError}>Error!</Button>
            {contextHolder}
        </div>
    );
};

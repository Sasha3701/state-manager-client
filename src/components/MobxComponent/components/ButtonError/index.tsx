import { Button, message } from "antd";
import { usersStore } from "../../../../stores/mobx";

export const ButtonError = ({  }) => { 
    const [messageApi, contextHolder] = message.useMessage({
        top: 100,
    });

    const handleError = async () => {
        try {
            await usersStore.getError();
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

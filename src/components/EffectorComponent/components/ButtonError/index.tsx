import { Button, message } from "antd";
import { useUnit } from "effector-react";
import { errorFx, errorTrigged } from "../../../../stores/effector/users";

export const ButtonError = () => {
    const [onError] = useUnit([errorTrigged]);

    const [messageApi, contextHolder] = message.useMessage({
        top: 100,
    });

    const handleError = () => {
        onError();

        errorFx.fail.watch(() => {
            messageApi.error({
                content: 'Error',
            })
        });
    };

    return (
        <div className="button-error">
            <Button type="primary" onClick={handleError}>Error!</Button>
            {contextHolder}
        </div>
    );
};

import { Button, message } from "antd";
import { useAtom } from "jotai";
import { getError } from "../../../../stores/jotai";

export const ButtonError = () => {
    const [messageApi, contextHolder] = message.useMessage({
        top: 100,
    });

    const [, handleGetError] = useAtom(getError);

    const handleError = async () => {
        try {
            await handleGetError();
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

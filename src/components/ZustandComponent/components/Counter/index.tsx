import { Card, Button } from "antd";
import { useCount } from "../../../../stores/zustand";

export const Count = () => {
    const { updateCount, count } = useCount(state => state);

    return (
        <Card
            title="Counter"
            extra={<Button onClick={updateCount}>Update</Button>} 
            style={{ width: 300 }}
        >
            <p>{count}</p>
        </Card>
    );
};

import { Card, Button } from "antd";
import { useUnit } from "effector-react";
import { $count, incrementClicked } from "../../../../stores/effector/count";

export const Count = () => {
    const [count, onIncrement] = useUnit([$count, incrementClicked]);

    return (
        <Card
            title="Counter"
            extra={<Button onClick={onIncrement}>Update</Button>} 
            style={{ width: 300 }}
        >
            <p>{count}</p>
        </Card>
    );
};

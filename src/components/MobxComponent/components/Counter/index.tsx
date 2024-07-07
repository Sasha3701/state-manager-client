import { Card, Button } from "antd";
import { observer } from "mobx-react-lite";
import { countStore } from "../../../../stores/mobx";

export const Count = observer(() => (
    <Card
        title="Counter"
        extra={<Button onClick={countStore.update}>Update</Button>} 
        style={{ width: 300 }}
    >
        <p>{countStore.count}</p>
    </Card>
));

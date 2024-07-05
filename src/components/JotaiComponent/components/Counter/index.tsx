import { Card, Button } from "antd";
import { useAtom } from 'jotai';
import { countAtom } from "../../../../stores/jotai";


export const Count = () => {
    const [count, handleUpdateCounter] = useAtom(countAtom);

    return (
        <Card
            title="Counter"
            extra={<Button onClick={handleUpdateCounter}>Update</Button>} 
            style={{ width: 300 }}
        >
            <p>{count}</p>
        </Card>
    );
};

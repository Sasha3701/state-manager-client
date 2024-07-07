import { ButtonError, Count, List } from "./components";

export const MobxComponent = () => (
    <div className="wrapper">
        <div className="container">
            <List />
            <Count />
        </div>
        <ButtonError />
    </div>
);

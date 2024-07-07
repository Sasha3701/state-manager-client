import { ButtonError, Count, List } from "./components";

export const EffectorComponent = () => (
    <div className="wrapper">
        <div className="container">
            <List />
            <Count />
        </div>
        <ButtonError />
    </div>
);

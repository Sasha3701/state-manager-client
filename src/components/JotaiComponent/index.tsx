import { ButtonError, Count, List } from "./components";

export const JotaiComponent = () => (
    <div className="wrapper">
        <div className="container">
            <List />
            <Count />
        </div>
        <ButtonError />
    </div>
);

import { ButtonError, Count, List } from "./components";

export const ZustandComponent = () => (
    <div className="wrapper">
        <div className="container">
            <List />
            <Count />
        </div>
        <ButtonError />
    </div>
);

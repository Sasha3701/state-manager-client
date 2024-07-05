import ReactDOM from 'react-dom/client'
import {
    BrowserRouter,
    Link,
    Outlet,
    Route,
    Routes,
  } from "react-router-dom";
import { ZustandComponent, JotaiComponent } from './components/index.ts';
import './index.css'

const Dashboard = () => (
    <>
        <div className="navigate">
            <ul>
                <li><Link to="/zustand">Zustand</Link></li>
                <li><Link to="/jotai">Jotai</Link></li>
            </ul>
        </div>
        <Outlet />
    </>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />}>
                <Route
                    path="zustand"
                    element={<ZustandComponent />}
                />
                <Route
                    path="jotai"
                    element={<JotaiComponent />}
                />
            </Route>
        </Routes>
    </BrowserRouter>
)

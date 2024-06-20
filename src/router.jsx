import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Stuff from "./pages/Stuff/Index";
import StuffCreate from "./pages/Stuff/Create";
import TrashStuff from "./pages/TrashStuff";
import Inbound from "./pages/Inbound/Inbound";
import IndexInbound from "./pages/Inbound/indexInbound";
import User from "./pages/User/User";

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/stuff', element: <Stuff /> },
    { path: '/stuff/create', element: <StuffCreate /> },
    { path: '/stuff/trash', element: <TrashStuff /> },
    { path: '/inbound-stuff', element: <Inbound /> },
    { path: '/inbound', element: <IndexInbound /> },
    { path: '/user', element: <User /> },
])

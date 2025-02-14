import {createBrowserRouter} from "react-router";
import App from "../layout/App";
import Home from "../../features/Home";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import ActivityForm from "../../features/activities/form/ActivityForm.tsx";
import ActivityDetailPage from "../../features/activities/details/ActivityDetailPage.tsx";
import Counter from "../../features/counter/Counter.tsx";
import TestErrors from "../../features/errors/TestErrors.tsx";
import NotFound from "../../features/errors/NotFound.tsx";
import ServerError from "../../features/errors/ServerError.tsx";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            { path: "", element: <Home/> },
            { path: "activities", element: <ActivityDashboard /> },
            { path: "createActivity", element: <ActivityForm key={'create'}/> },
            { path: "activities/:id", element: <ActivityDetailPage/>, errorElement: <NotFound/> },  // Add errorElement here
            { path: "editActivity/:id", element: <ActivityForm key={'edit'}/> },
            { path: "counter", element: <Counter/> },
            { path: "errors", element: <TestErrors/> },
            { path: "not-found", element: <NotFound/> },
            { path: "server-error", element: <ServerError/> },
            { path: "*", element: <NotFound/> }  // Changed from Navigate to NotFound
        ],
        errorElement: <NotFound/>  // Add root-level errorElement
    }
]);
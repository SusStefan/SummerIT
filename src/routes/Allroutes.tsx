import { createBrowserRouter } from "react-router-dom";
import Home from "../components/home";
import Calculator from "../components/calculator";
import Calculatorstiintific from "../components/calculatorstiintific";
export const Allroutes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },{
        path: "/calculator",
        element: <Calculator />
    },{
        path:"/calculatorstiintific",
        element: <Calculatorstiintific />
    }
])
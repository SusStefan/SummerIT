import { createBrowserRouter } from "react-router-dom";
import Home from "../components/home";
import Calculator from "../components/calculator";
import Calculatorstiintific from "../components/calculatorstiintific";
import WeatherAPP from "../components/weatherAPP";
import Trade from "../components/trade";
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
    },{
        path:"/weather_app_example",
        element: <WeatherAPP />
    },{
        path:"/trade",
        element: <Trade />
    }
])
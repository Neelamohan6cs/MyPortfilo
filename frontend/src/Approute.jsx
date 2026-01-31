import { Route,Routes} from "react-router-dom";
import Api from "./api/api";
import Home from "./pages/home/Home";
export default function AppRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/api" element={<Api/>}/>
            </Routes>



        </div>
    )
}
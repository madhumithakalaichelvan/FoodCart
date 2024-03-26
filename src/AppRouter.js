
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Cart from "./Components/Cart";


function AppRouter(){
    return (
        <>
            <Routes>
                <Route  path="/" Component={Home} />
                <Route  path="/home" Component={Home} />
                <Route  path="/cart" Component={Cart} />
            </Routes>
        </>
    )

}

export default AppRouter;
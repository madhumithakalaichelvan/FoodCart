import { configureStore } from "@reduxjs/toolkit"
import FoodReducer from "./Reducer/FoodReducer";


const store = configureStore({
    devTools:true,
    reducer: {
        foodReducer: FoodReducer
    }
})

export default store;
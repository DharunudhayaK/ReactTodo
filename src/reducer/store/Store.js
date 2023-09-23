import { configureStore } from "@reduxjs/toolkit";
import crud from "../state/State";


export default configureStore({
    reducer: {
        capture: crud
    }
})
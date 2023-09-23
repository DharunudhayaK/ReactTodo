import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    arrOfObj: "",
    inputVal1: "",
    inputVal2: "",
    popupInpA: "",
    editData: "",
}


export const crud = createSlice({
    name: "budget",
    initialState,
    reducers: {
        data: (state, action) => { state.arrOfObj = action.payload },
        inp: (state, action) => { state.inputVal1 = action.payload },
        inp2: (state, action) => { state.inputVal2 = action.payload },
        popA: (state, action) => { state.popupInpA = action.payload },
        editItem: (state, action) => { state.editData = action.payload },
    }
})

export const { data, inp, inp2, popA, editItem } = crud.actions;
export default crud.reducer
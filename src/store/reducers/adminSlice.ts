import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdmin } from "../../models/IAdmin";

const initialState: IAdmin = {
	token: localStorage.getItem("token"),
};

export const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
	},
});

export const { setAuth } = adminSlice.actions;
export default adminSlice.reducer;

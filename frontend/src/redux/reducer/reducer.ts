import { combineReducers } from "redux";
import userSlice from "../slice/userSlice";
export const rootReducer = combineReducers({
    userSlice
})

export type RootState = ReturnType<typeof rootReducer>;
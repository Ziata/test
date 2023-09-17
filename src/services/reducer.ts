import { api } from "@/services/api";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
});

export default rootReducer;

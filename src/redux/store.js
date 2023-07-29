import { createStore } from "redux";
import ReducerToSaveInfo from "./reducers/ReducerToSaveInfo";

const store = createStore(ReducerToSaveInfo);
export default store;

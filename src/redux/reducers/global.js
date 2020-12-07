import { reset, setGlobalState } from "src/redux/actions/global";
import { initialState } from "../slices/cells";

export const propsReducer = (obj) =>  Object.keys(obj).reduce((newObj, key) => {
    newObj[key] = (state = obj[key], action) => state; 
    return newObj
},{});

export const handleActions = {
    [reset]: (state, action) => {
        return {
            ...state,
            cells:initialState,
        }
    },
    [setGlobalState]: (state, action) => {
        if(typeof action.payload === "object") 
            return {
                ...state,
                ...action.payload
            }
        return state; 
    }
}
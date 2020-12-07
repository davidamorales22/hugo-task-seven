import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux"
import { handleActions } from "src/redux/reducers/global"
import cells from "src/redux/slices/cells"

const allReducers = combineReducers({
    cells: cells.reducer,
});

const globalReducers = (state, action) => {   
    if(handleActions[action.type]) return handleActions[action.type](state, action);
    return allReducers(state, action)
};

const store = configureStore({reducer: globalReducers});

export default store;
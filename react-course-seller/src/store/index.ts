import { combineReducers } from 'redux'
import { configureStore } from "@reduxjs/toolkit"
import userReducer from './reducers/user'

const allReducers = combineReducers({
    user: userReducer,
})

const store = configureStore({reducer: allReducers})

export default store
import {createStore, combineReducers, applyMiddleware, compose} from "redux"  
import profileReducer from "./profileReducer"
import messagesReducer from "./messagesReducer"
import navbarReducer from "./navbarReducer"
import usersReducer from "./usersReducer"
import authReducer from "./authReducer"
import thunkMiddleware from "redux-thunk"
import appReducer from "./appReducer"
// import { reducer as formReducer } from "redux-form"

let rootReducer = combineReducers({
	profilePage: profileReducer,
	messagesPage: messagesReducer,
	navbarPage: navbarReducer,
	usersPage: usersReducer,
	auth: authReducer,
	app: appReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends {[key: string]:  infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]:  (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.store = store

export default store
import {createSelector} from "reselect"
import { AppStateType } from './reduxStore';

export const selectIsAuth = (state: AppStateType) => {
	return state.auth.isAuth
}

export const selectCurrentUserLogin = (state: AppStateType) => {
	return state.auth.login
}




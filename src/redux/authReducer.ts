import {authAPI, securityAPI} from "./../api/api"
import { ResultCodeForCaptcha, ResultCodes } from '../api/api';

const SET_USER_DATA = "SET_USER_DATA"
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS"

// export type InitialStateType2 = {
// 	id: number | null,
// 	login: string | null
// 	email: string | null,
// 	isAuth: boolean,
// 	errorMessage: string,
// 	captchaUrl: string | null
// }

let initialState = {
	id: null as number | null,
	login: null as string | null,
	email: null as string | null,
	isAuth: false,
	errorMessage: [] as Array<string>,
	captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
	
	switch(action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.payload,
				userIDefef: 21
			}	
		case GET_CAPTCHA_URL_SUCCESS:
			return {
				...state,
				captchaUrl: action.url
			}	
		default:
			return state		
	}
}

type SetAuthUserDataActionPayloadType = {
	id: number | null
	email: string | null
	login: string | null
	isAuth: boolean
	errorMessage: Array<string>
	captchaUrl: string | null
}

type SetAuthUserDataActionType = {
	type: typeof SET_USER_DATA
	payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null,
	isAuth: boolean, errorMessage: Array<string>, captchaUrl: string | null): SetAuthUserDataActionType =>
	 ({ type: SET_USER_DATA, payload: {id, email, login, isAuth, errorMessage, captchaUrl} })


type getCaptchaUrlSuccessActionType = {
	type: typeof GET_CAPTCHA_URL_SUCCESS
	url: string
}

export const getCaptchaUrlSuccess = (url: string): getCaptchaUrlSuccessActionType =>
	 ({ type: GET_CAPTCHA_URL_SUCCESS, url})


export const getMyData = () => async (dispatch: any) => {
	let data = await authAPI.getMyData()
		if(data.resultCode === ResultCodes.Success) {
			let {id, email, login} = data.data
			dispatch(setAuthUserData(id, email, login, true, [], null))
	}
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) =>
	async (dispatch: any) => {
	let data = await authAPI.login(email, password, rememberMe, captcha)

		if (data.resultCode === ResultCodes.Success) {
			dispatch(getMyData())
		} else {
			dispatch(setAuthUserData(null, null, null, false, data.messages, null))
			if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
				dispatch(getCaptchaUrl())
			}
			
		}	
}

export const getCaptchaUrl = () => async (dispatch: any) => {
	let data = await securityAPI.getCaptchaUrl()
	dispatch(getCaptchaUrlSuccess(data.url))
		
}

export const logout = () => async (dispatch: any) => {
	let data = await authAPI.logout()
		if(data.resultCode === 0) {
			dispatch(setAuthUserData(null, null, null, false, [], null))
	}	
}

export default authReducer
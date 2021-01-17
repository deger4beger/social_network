import {authAPI} from "./../api/api"
import {getMyData} from "./authReducer"

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"

export type InitialStateType = {
	initialized: boolean
}

let initialState: InitialStateType = {
	initialized: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {
	
	switch(action.type) {
		case INITIALIZED_SUCCESS:
			return {
				...state,
				initialized: true
			}	
		default:
			return state		
	}
}

type initializedSuccessActionType = {
	type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessActionType => ({ type: INITIALIZED_SUCCESS})

export const initializeApp = () => {
	
	return (dispatch: any) => {
		let promise = dispatch(getMyData())
		Promise.all([promise]).
			then(() => {
				dispatch(initializedSuccess())
		})
	}	
}

export default appReducer
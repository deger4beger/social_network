import {profileAPI} from "./../api/api"
import { PhotosType, PostType, ProfileType } from '../types/types';

const ADD_POST = "ADD-POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const SET_STATUS = "SET_STATUS"
const DELETE_POST = "DELETE_POST"
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"
const ERROR_MESSAGE = "ERROR_MESSAGE"


let initialState = {
	posts: [
			{id: 1, message: "Hi, how are you ?", likesCount: 9},
			{id: 2, message: "It's my first post", likesCount: 17},
		] as Array<PostType>,
	profile: null as ProfileType | null,
	isFetching: false,
	status: "",
	errorMessage: ""
}

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {
	switch(action.type) {
		case ADD_POST:
			return {
				...state,
				posts: [{id: 5,
						message: action.postText,
						likesCount: 0}, ...state.posts]
			}
		case SET_USER_PROFILE: 
			return {...state, profile: action.profile, errorMessage: ""}	
		case TOGGLE_IS_FETCHING: 
			return {...state, isFetching: action.isFetching}
		case SET_STATUS: 
			return {...state, status: action.status}	
		case DELETE_POST:
			return {...state, posts: state.posts.filter( p => p.id != action.postId)}
		case SAVE_PHOTO_SUCCESS:
			return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
		case ERROR_MESSAGE:
			return {...state, errorMessage: action.errorMessage}									
		default:
			return state		
	}
}

type addPostActionCreatorType = {
	type: typeof ADD_POST
	postText: string



}
type setUserProfileType = {
	type: typeof SET_USER_PROFILE
	profile: ProfileType
}
type toggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean}
type setStatusType = {
	type: typeof SET_STATUS
	status: string}
type deletePostType = {
	type: typeof DELETE_POST
	postId: number}
type savePhotoSuccessType = {
	type: typeof SAVE_PHOTO_SUCCESS
	photos: PhotosType}
type setErrorMesssage = {
	type: typeof ERROR_MESSAGE
	errorMessage: string}

export const addPostActionCreator = (postText: string): addPostActionCreatorType => ({ type: ADD_POST, postText })
export const setUserProfile = (profile: ProfileType): setUserProfileType => ({ type: SET_USER_PROFILE, profile })
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const setStatus = (status: string): setStatusType => ({ type: SET_STATUS, status })
export const deletePost = (postId: number): deletePostType=> ({ type: DELETE_POST, postId })
export const savePhotoSuccess = (photos: PhotosType): savePhotoSuccessType => ({ type: SAVE_PHOTO_SUCCESS, photos })
export const setErrorMesssage = (errorMessage: string): setErrorMesssage => ({ type: ERROR_MESSAGE, errorMessage })

export const getUserProfile = (userId: number) => async (dispatch: any) => {
	dispatch(toggleIsFetching(true))
	let data = await profileAPI.getUserProfile(userId)
		dispatch(setUserProfile(data))
		dispatch(toggleIsFetching(false))
}

export const getStatus = (userId: number) => async (dispatch: any) => {
	let data = await profileAPI.getStatus(userId)
		dispatch(setStatus(data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
	let data = await profileAPI.updateStatus(status)
		if(data.resultCode === 0) {
			dispatch(setStatus(status))
		}		
}

export const savePhoto = (file: any) => async (dispatch: any) => {
	let data = await profileAPI.savePhoto(file)
		if(data.resultCode === 0) {
			dispatch(savePhotoSuccess(data.data.photos))
		}		
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
	const id = getState().auth.id
	let data = await profileAPI.saveProfile(profile)
	if (data.resultCode === 0) {
		dispatch(getUserProfile(id))
	} else {
		dispatch(setErrorMesssage(data.messages[0]))
		return Promise.reject(data.messages[0])
	}		
}

export default profileReducer
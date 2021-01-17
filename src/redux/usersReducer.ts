import {usersAPI, followAPI} from "./../api/api"
import { UserType } from '../types/types';
import { AppStateType, InferActionsTypes } from './reduxStore';
import { Dispatch } from 'redux';
import { ThunkAction } from "redux-thunk"

// const TOGGLE_FOLLOW= "TOGGLE_FOLLOW"
// const SET_USERS = "SET_USERS"
// const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
// const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
// const TOGGLE_IS_FETCHGING = "TOGGLE_IS_FETCHGING"
// const TOGGLE_FOLLOWING_IN_PROGRESS = "TOGGLE_FOLLOWING_IN_PROGRESS"


let initialState = {
	users: [	] as Array<UserType>,
	pageSize: 3,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [] as Array<number>, // array of user's ids
	filter: {
		term: "",
		friend: null as null | boolean
	}
}

type initalStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): initalStateType => {
	
	switch(action.type) {
		case "TOGGLE_FOLLOW":
			return {
				...state,
				users: state.users.map(u => {
					if (u.id === action.userID) {
						return {...u, followed: !u.followed}
					}
					return u
				})
			}	
		case "SET_USERS":
			return { ...state, users: action.users}
		case "SET_CURRENT_PAGE":
			return { ...state, currentPage: action.currentPage}	
		case "SET_FILTER": 
			return {...state, filter: action.payload}	
		case "SET_TOTAL_USERS_COUNT":
			return { ...state, totalUsersCount: action.totalCount}	
		case "TOGGLE_IS_FETCHGING":
			return {...state, isFetching: action.isFetching}
		case "TOGGLE_FOLLOWING_IN_PROGRESS":
			return {...state,
					followingInProgress: action.isFetching 
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id != action.userId)}
		// case "FAKE":
		// 	return {
		// 		...state,
		// 		fake: state.fake + 1
		// 	}								
		default:
			return state		
	}
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
	toggleFollow: (userID: number) => ({ type: "TOGGLE_FOLLOW", userID } as const),
	setUsers: (users: Array<UserType>) => ({ type: "SET_USERS", users } as const),
	setCurrentPage: (currentPage: number) => ({ type: "SET_CURRENT_PAGE", currentPage} as const),
	setFilter: (filter: FilterType) => ({ type: "SET_FILTER", payload: filter} as const),
	setTotalUsersCount: (totalCount: number) =>
		({ type: "SET_TOTAL_USERS_COUNT", totalCount} as const),
	toggleIsFetching: (isFetching: boolean) =>
		({ type: "TOGGLE_IS_FETCHGING", isFetching } as const),
	toggleIsFollowingProgress: (isFetching: boolean, userId: number) =>
		({ type: "TOGGLE_FOLLOWING_IN_PROGRESS", isFetching, userId } as const)
}



type StateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType, length = 0) =>
	async (dispatch: DispatchType, getState: StateType) => {	
		if (length === 0) {
			dispatch(actions.setCurrentPage(currentPage))
			dispatch(actions.toggleIsFetching(true))
			dispatch(actions.setFilter(filter))
			let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
			dispatch(actions.toggleIsFetching(false))
			dispatch(actions.setUsers(data.items))
			dispatch(actions.setTotalUsersCount(data.totalCount))
		}	
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any,
	actionCreator: (userId: number) => ActionsTypes) => {
		dispatch(actions.toggleIsFollowingProgress(true, userId))
		let data = await apiMethod(userId)
		if (data.resultCode === 0) {
			dispatch(actionCreator(userId))
		}
		dispatch(actions.toggleIsFollowingProgress(false, userId))
}


export const follow = (userId: number): ThunkType => async (dispatch, getState) => {
	_followUnfollowFlow(dispatch, userId, followAPI.follow.bind(followAPI), actions.toggleFollow)
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
	_followUnfollowFlow(dispatch, userId, followAPI.unfollow.bind(followAPI), actions.toggleFollow)
}

export type FilterType = typeof initialState.filter
export default usersReducer